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

// Read the package.json file to get the list of dependencies
const vendorPkg = await fs.readFile(
  path.resolve(__dirname, "../package.json"),
  "utf-8"
);

// Create a Set of vendor package names from dependencies
const VENDOR_PKGS = new Set(Object.keys(JSON.parse(vendorPkg).dependencies));

const main = async () => {
  // Get all d3-* and internmap packages from node_modules
  const pkgs = (
    await fs.readdir(path.resolve(__dirname, "../node_modules/"))
  ).filter((name) => /^(d3-|internmap)/.test(name));

  // Check for nested node_modules to prevent dependency conflicts
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

  // Define paths for different module formats
  const EsmBasePath = path.resolve(__dirname, `../es`);
  const CjsBasePath = path.resolve(__dirname, `../lib`);
  const VendorBasePath = path.resolve(__dirname, `../lib-vendor`);

  // Collect all base directories for cleaning and creation
  const baseDirs: ConcatArray<string> = [
    EsmBasePath,
    CjsBasePath,
    VendorBasePath,
  ];

  // Add d3-* patterns to clean globs
  const cleanGlobs = ([] as Array<string>).concat(
    baseDirs,
    path.resolve(__dirname, "../d3-*")
  );

  // Clean up old vendor directories
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

  // Transpile vendor sources using esbuild
  console.log("🧙 Transpiling vendor sources.");
  await esbuild(config);

  // Generate package indexes and copy licenses
  console.log("📜 Copying licenses and generating indexes.");

  for (const pkgName of pkgs) {
    console.log(`📦 - ${pkgName}`);

    // Get package info and setup paths
    const pkgBase = path.resolve(__dirname, `../node_modules/${pkgName}`);
    const pkgPath = path.join(pkgBase, `package.json`);
    const pkg = await fs
      .readFile(pkgPath)
      .then((buf) => JSON.parse(buf.toString()));
    const libVendorPath = path.resolve(__dirname, `../lib-vendor/${pkgName}`);

    // Generate module files and copy licenses in parallel
    await Promise.all([
      // Generate ESM index
      fs.writeFile(path.join(EsmBasePath, `${pkgName}.js`), getEsmIndex(pkg)),
      // Generate CommonJS index
      fs.writeFile(path.join(CjsBasePath, `${pkgName}.js`), getCjsIndex(pkg)),
      // Copy LICENSE file
      fs.copyFile(
        path.join(pkgBase, "LICENSE"),
        path.join(libVendorPath, "LICENSE")
      ),
      // Generate root CommonJS index for vendor packages
      VENDOR_PKGS.has(pkgName) &&
        fs.writeFile(
          path.resolve(__dirname, `../${pkgName}.js`),
          getCjsRootIndex(pkg)
        ),
      // Generate TypeScript definitions for vendor packages
      VENDOR_PKGS.has(pkgName) &&
        fs.writeFile(
          path.resolve(__dirname, `../${pkgName}.d.ts`),
          getTypeDefinitionFile(pkg)
        ),
    ]);
  }
};

// Execute the build process
main()
  .then(() => {
    console.log("🌹 Build finished.");
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
