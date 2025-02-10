# @antv/vendor

A centralized dependency management solution for d3 libraries, providing vendored third-party commonjs dependencies (inspired by [VictoryVendor](https://github.com/FormidableLabs/victory/tree/main/packages/victory-vendor)).

## 📦 Included Packages

We provide the following libraries:

- d3-array
- d3-color
- d3-dispatch
- d3-dsv
- d3-fetch
- d3-force
- d3-force-3d
- d3-format
- d3-geo
- d3-geo-projection
- d3-hierarchy
- d3-interpolate
- d3-path
- d3-quadtree
- d3-random
- d3-regression
- d3-scale-chromatic
- d3-shape
- d3-timer

> Note: The following packages currently lack TypeScript type definitions:
>
> - d3-regression
> - d3-geo-projection
> - d3-force-3d

## 📥 Installation

```shell
npm install @antv/vendor
# or
yarn add @antv/vendor
# or
pnpm add @antv/vendor
```

## 🔄 Usage

### ESM

```diff
- import { geoProjection } from "d3-geo-projection"
+ import { geoProjection } from "@antv/vendor/d3-geo-projection";
```

### CommonJS

```js
const { geoProjection } = require("@antv/vendor/d3-geo-projection");
```

Both ESM and CommonJS are supported. The package automatically routes to the appropriate version based on your import style.

### Version Information

Here are the specific versions for each package:

```json
{
  "d3-array": "3.2.4",
  "d3-color": "3.1.0",
  "d3-dispatch": "3.0.1",
  "d3-dsv": "3.0.1",
  "d3-fetch": "3.0.1",
  "d3-force": "3.0.0",
  "d3-force-3d": "3.0.5",
  "d3-format": "3.1.0",
  "d3-geo": "3.1.1",
  "d3-geo-projection": "4.0.0",
  "d3-hierarchy": "3.1.2",
  "d3-interpolate": "3.0.1",
  "d3-path": "3.1.0",
  "d3-quadtree": "3.0.1",
  "d3-random": "3.0.1",
  "d3-regression": "1.3.10",
  "d3-scale-chromatic": "3.1.0",
  "d3-shape": "3.2.0",
  "d3-timer": "3.0.1"
}
```

## 🛠️ Development

This project recommends using [bun](https://bun.sh/) for development.

1. Install dependencies:

```shell
bun install
```

2. Link module-resolver:

```shell
cd module-resolver && bun link && cd .. && bun link module-resolver
```

3. Build the project:

```shell
bun run scripts/build.ts
```

## 📄 License

This project is released under the MIT license, but the vendor'ed in libraries include other licenses (e.g. ISC) that we enumerate in our package.json:license field.
