import { defineConfig } from 'tsup'

export default defineConfig((options) => { // The options here is derived from CLI flags.
  return {
    entry: {
      index: 'src/index.ts',
    },
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    minify: !options.watch,
  }
})
