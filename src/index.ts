import type { RsbuildPlugin } from '@rsbuild/core'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import archiver from 'archiver'
import { logger } from 'rslog'

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

export function pluginZip({
  zipName = 'dist.zip',
  inputDir = 'dist',
  outputDir = '.',
  enabled = true,
}: PluginZipOptions = {}): RsbuildPlugin {
  return {
    name: 'plugin-zip',
    setup(api) {
      if (!enabled)
        return
      api.onAfterBuild(async () => {
        const cwd = process.cwd()
        const inputPath = path.resolve(cwd, inputDir)
        const outputPath = path.resolve(cwd, outputDir)
        const outputZip = path.resolve(outputPath, zipName)

        const output = fs.createWriteStream(outputZip)
        const archive = archiver('zip', { zlib: { level: 9 } })
        archive.directory(inputPath, false)
        archive.pipe(output)
        archive.finalize()

        logger.success(`zip done: ${outputZip}`)
      })
    },
  }
}
