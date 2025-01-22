**vendor**

Vendored dependencies for **antv** (inspired by [VictoryVendor](https://github.com/FormidableLabs/victory/tree/main/packages/victory-vendor))

Recommend to use bun to install and run this project

📢: You need to prepack and link module-resolver to vendor before run build scripts

```shell
bun install

# link module-resolver to vendor
cd module-resolver && bun link && cd .. && bun link module-resolver

# run build script
bun run scripts/build.ts
```
