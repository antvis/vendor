import path from "path";
import { type PluginBuild } from "esbuild";

const resolveD3Plugin = {
  name: "resolve-d3",
  setup(build: PluginBuild) {
    build.onResolve({ filter: /^(d3-[^\/]+|internmap)$/ }, (args) => {
      const d3pattern = /^(?<pkg>(d3-[^\/]+|internmap))(?<path>.*)/;
      const match = d3pattern.exec(args.path);

      if (match) {
        if (match.groups?.path) {
          throw new Error(
            `Unable to process ${args.path} import in ${args.importer}`
          );
        }

        const vendorPkg = `lib-vendor/${match.groups?.pkg}/src/index.js`;
        const currentFileVendor = args.importer.replace(
          /^node_modules/,
          "lib-vendor"
        );
        const relPathToPkg = path
          .relative(path.dirname(currentFileVendor), vendorPkg)
          .replace(/\\/g, "/");

        return {
          path: relPathToPkg,
        };
      }

      return { path: args.path };
    });
  },
};

export default {
  entryPoints: ["node_modules/*/src/**/*.js"],
  outdir: "lib-vendor",
  format: "cjs",
  bundle: false,
  plugins: [resolveD3Plugin],
  sourcemap: false,
} as import("esbuild").BuildOptions;
