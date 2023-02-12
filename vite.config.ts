import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['html', 'lcov'],
    },
    globals: true,
    // exclude: ['example/**'],
  },
})
