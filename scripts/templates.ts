// Templates.
export const getEsmIndex = (pkg: any) => `
// \`@antv/vendor/${pkg.name}\` (ESM)
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
// \`@antv/vendor/${pkg.name}\` (CommonJS)
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
// \`@antv/vendor/${pkg.name}\` (CommonJS)
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
// \`@antv/vendor/${pkg.name}\` (TypeScript)
//
// Export the type definitions for this package:
export * from "${pkg.name}";
`;

export const d3RegressionIndexContent = `"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    regressionExp: function() {
        return _exponential.default;
    },
    regressionLinear: function() {
        return _linear.default;
    },
    regressionLoess: function() {
        return _loess.default;
    },
    regressionLog: function() {
        return _logarithmic.default;
    },
    regressionPoly: function() {
        return _polynomial.default;
    },
    regressionPow: function() {
        return _power.default;
    },
    regressionQuad: function() {
        return _quadratic.default;
    }
});
var _exponential = /*#__PURE__*/ _interop_require_default(require("./exponential.js"));
var _linear = /*#__PURE__*/ _interop_require_default(require("./linear.js"));
var _loess = /*#__PURE__*/ _interop_require_default(require("./loess.js"));
var _logarithmic = /*#__PURE__*/ _interop_require_default(require("./logarithmic.js"));
var _polynomial = /*#__PURE__*/ _interop_require_default(require("./polynomial.js"));
var _power = /*#__PURE__*/ _interop_require_default(require("./power.js"));
var _quadratic = /*#__PURE__*/ _interop_require_default(require("./quadratic.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
`;
