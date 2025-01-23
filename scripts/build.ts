import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import swc, { Options } from "@swc/core";
import {
  d3RegressionIndexContent,
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
  const pkgs = new Set(
    (await fs.readdir(path.resolve(__dirname, "../node_modules/"))).filter(
      (name) => /^(d3-|internmap)/.test(name)
    )
  );

  const typePkgs = new Set(
    (
      await fs.readdir(path.resolve(__dirname, "../node_modules/@types/"))
    ).filter((name) => /^(d3-|internmap)/.test(name))
  );

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
  const files = await glob("node_modules/*/src/**/*.js");
  const config: Options = JSON.parse(
    await fs.readFile(path.resolve(__dirname, "../config/.swcrc"), "utf-8")
  );

  await Promise.all(
    files.map(async (file: string) => {
      try {
        const filePath = path.resolve(file);
        const d3pattern =
          /^.*node_modules\/(?<pkg>(d3-[^/]+|internmap))(?<path>.*)/;
        const match = d3pattern.exec(filePath);

        // Skip files that don't match d3 pattern
        if (!match) {
          return;
        }

        const outputPath = filePath.replace(/node_modules/, "lib-vendor");
        const content = await fs.readFile(filePath, "utf-8");

        // Transpile the file using swc
        const output = await swc.transform(content, {
          ...config,
          filename: file,
        });

        // write code to output path
        const outputDir = path.dirname(outputPath);
        if (!(await fs.exists(outputDir))) {
          await fs.mkdir(outputDir, { recursive: true });
        }
        await fs.writeFile(outputPath, output.code, "utf-8");
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        throw error;
      }
    })
  );
  console.log("✨ Vendor sources transpilation completed.");

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
      fs.writeFile(path.join(EsmBasePath, `${pkgName}.mjs`), getEsmIndex(pkg)),
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
        typePkgs.has(pkgName) &&
        fs.writeFile(
          path.resolve(__dirname, `../${pkgName}.d.ts`),
          getTypeDefinitionFile(pkg)
        ),
    ]);
  }

  // d3-regression do not have index.js, need to write it manually
  await writeD3RegressionPathIndex();
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

async function writeD3RegressionPathIndex() {
  const d3RegressionPath = path.resolve(
    __dirname,
    "../lib-vendor/d3-regression/src/index.js"
  );

  await fs.writeFile(d3RegressionPath, d3RegressionIndexContent, "utf-8");
}
