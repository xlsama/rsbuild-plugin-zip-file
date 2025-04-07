Zip plugin for Rsbuild.

## Install
```
pnpm add rsbuild-plugin-zip -D
```

## Usage
```ts
// rsbuild.config.ts
import { RsbuildPluginZip } from "rsbuild-plugin-zip";

export default {
  plugins: [
    RsbuildPluginZip()
  ]
};
```

## Options
```ts
export interface PluginZipOptions {
  /**
   * Zip file name
   * @default `dist.zip`
   */
  zipName?: string
  /**
   * Input Directory name
   * @default `dist`
   */
  inputDir?: string
  /**
   * Output Directory name
   * @default `.`
   */
  outputDir?: string
  /**
   * Enabled
   * @default `true`
   */
  enabled?: boolean
}
```
