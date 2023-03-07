import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['html', 'lcov'],
    },
    environment: 'happy-dom',
    globals: true,
    // exclude: ['example/**'],
  },
})
