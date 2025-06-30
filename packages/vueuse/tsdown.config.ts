import { defineConfig } from 'tsdown'

export default defineConfig((options) => { // The options here is derived from CLI flags.
  return {
    entry: {
      index: 'src/index.ts',
    },
    unbundle: true,
    sourcemap: true,
    clean: true,
    dts: true,
    fixedExtension: true,
    minify: !options.watch,
  }
})
