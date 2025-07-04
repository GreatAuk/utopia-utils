import { defineConfig, type ViteUserConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['html', 'lcov'],
      include: ['packages/**/src/**/*.ts'],
      exclude: ['packages/**/src/index.ts'],
    },
    // environment: 'happy-dom',
    environmentMatchGlobs: [
      // all tests in packages/dom/** will run in happy-dom
      ['packages/dom/**', 'happy-dom'],
    ],
    globals: true,
    // exclude: ['example/**'],
  },
}) as ViteUserConfig
