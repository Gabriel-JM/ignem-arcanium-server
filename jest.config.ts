import Jest from '@jest/types'
import dotenvSafe from 'dotenv-safe'

dotenvSafe.config({ path: '.env.test' })

export default <Jest.Config.InitialOptions> {
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/tests/(.+)': '<rootDir>/tests/$1',
    '^@/(.+)': '<rootDir>/src/$1'
  }
}
