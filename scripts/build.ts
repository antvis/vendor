import fs from "fs/promises";
import path from "path";
import { build as esbuild } from "esbuild";
import config from "../config/esbuild.config";
import {
  getCjsIndex,
  getCjsRootIndex,
  getEsmIndex,
  getTypeDefinitionFile,
} from "./templates";

const vendorPkg = await fs.readFile(
  path.resolve(__dirname, "../package.json"),
  "utf-8"
);

const VENDOR_PKGS = new Set(Object.keys(JSON.parse(vendorPkg).dependencies));

const main = async () => {
  const pkgs = (
    await fs.readdir(path.resolve(__dirname, "../node_modules/"))
  ).filter((name) => /^(d3-|internmap)/.test(name));

  for (const pkgName of pkgs) {
    const pkgModsPath = path.resolve(
      __dirname,
      `../node_modules/git${pkgName}/node_modules`
    );
    const stat = await fs.lstat(pkgModsPath).catch(() => null);
    if (stat) {
      throw new Error(`Found nested modules: ${pkgModsPath}`);
    }
  }

  const EsmBasePath = path.resolve(__dirname, `../es`);
  const CjsBasePath = path.resolve(__dirname, `../lib`);
  const VendorBasePath = path.resolve(__dirname, `../lib-vendor`);

  const baseDirs: ConcatArray<string> = [
    EsmBasePath,
    CjsBasePath,
    VendorBasePath,
  ];

  const cleanGlobs = ([] as Array<string>).concat(
    baseDirs,
    path.resolve(__dirname, "../d3-*")
  );

  console.log("🧹 Cleaning old vendor directories.");
  await Promise.all(
    cleanGlobs.map((glob) => fs.rm(glob, { recursive: true, force: true }))
  );
  console.log("📁 Creating empty vendor directories. ");
  await Promise.all(
    (baseDirs as Array<string>).map((libPath) => {
      fs.mkdir(libPath, {
        recursive: true,
      });
    })
  );

  console.log("🧙 Transpiling vendor sources.");
  await esbuild(config);

  console.log("📜 Copying licenses and generating indexes.");

  for (const pkgName of pkgs) {
    console.log(`📦 - ${pkgName}`);

    const pkgBase = path.resolve(__dirname, `../node_modules/${pkgName}`);
    const pkgPath = path.join(pkgBase, `package.json`);
    const pkg = await fs
      .readFile(pkgPath)
      .then((buf) => JSON.parse(buf.toString()));
    const libVendorPath = path.resolve(__dirname, `../lib-vendor/${pkgName}`);

    await Promise.all([
      fs.writeFile(path.join(EsmBasePath, `${pkgName}.js`), getEsmIndex(pkg)),
      fs.writeFile(path.join(CjsBasePath, `${pkgName}.js`), getCjsIndex(pkg)),
      fs.copyFile(
        path.join(pkgBase, "LICENSE"),
        path.join(libVendorPath, "LICENSE")
      ),
      VENDOR_PKGS.has(pkgName) &&
        fs.writeFile(
          path.resolve(__dirname, `../${pkgName}.js`),
          getCjsRootIndex(pkg)
        ),
      VENDOR_PKGS.has(pkgName) &&
        fs.writeFile(
          path.resolve(__dirname, `../${pkgName}.d.ts`),
          getTypeDefinitionFile(pkg)
        ),
    ]);
  }
};

main()
  .then(() => {
    console.log("🌹 Build finished.");
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
