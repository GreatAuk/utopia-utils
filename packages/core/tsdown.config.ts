import { defineConfig } from 'tsdown'

export default defineConfig((options) => { // The options here is derived from CLI flags.
  return {
    entry: {
      index: 'src/index.ts',
    },
    sourcemap: true,
    clean: true,
    dts: {

    },
    fixedExtension: true,
    minify: !options.watch,
  }
})
