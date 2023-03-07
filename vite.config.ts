import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['html', 'lcov'],
    },
    // environment: 'happy-dom',
    environmentMatchGlobs: [
      // all tests in packages/dom/** will run in happy-dom
      ['packages/dom/**', 'happy-dom'],
    ],
    globals: true,
    // exclude: ['example/**'],
  },
})
