// Templates.
export const getEsmIndex = (pkg: any) => `
// \`victory-vendor/${pkg.name}\` (ESM)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// Our ESM package uses the underlying installed dependencies of \`node_modules/${
  pkg.name
}\`
export * from "${pkg.name}";
`;

export const getCjsIndex = (pkg: any) => `
// \`victory-vendor/${pkg.name}\` (CommonJS)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// Our CommonJS package relies on transpiled vendor files in \`lib-vendor/${
  pkg.name
}\`
module.exports = require("../lib-vendor/${pkg.name}/src/index.js");
`;

export const getCjsRootIndex = (pkg: any) => `
// \`victory-vendor/${pkg.name}\` (CommonJS)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// This file only exists for tooling that doesn't work yet with package.json:exports
// by proxying through the CommonJS version.
module.exports = require("./lib/${pkg.name}");
`;

export const getTypeDefinitionFile = (pkg: any) => `
// \`victory-vendor/${pkg.name}\` (TypeScript)
//
// Export the type definitions for this package:
export * from "${pkg.name}";
`;
