import { defineConfig } from 'vitest/config'
import path from 'path'
import dotenvSafe from 'dotenv-safe'

dotenvSafe.config({ path: '.env.test' })

export default defineConfig({
  resolve: {
    alias: {
      '@/tests': path.resolve('tests'),
      '@': path.resolve('src'),
    }
  },
  root: './tests/unit',
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      reportsDirectory: '../../coverage',
      exclude: [
        'tests',
        'src/main',
        'src/presentation/controllers/info'
      ]
    }
  }
})
