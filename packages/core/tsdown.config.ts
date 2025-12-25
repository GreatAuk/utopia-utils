import { defineConfig } from 'tsdown'
import type { UserConfig, UserConfigFn } from 'tsdown'

const config: UserConfigFn | UserConfig = defineConfig((options) => {
  return {
    entry: {
      index: 'src/index.ts',
    },
    sourcemap: true,
    clean: true,
    dts: {
      sourcemap: true,
    },
    fixedExtension: true,
    minify: !options.watch,
  }
})

export default config