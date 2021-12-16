import Jest from '@jest/types'

export default <Jest.Config.InitialOptions> {
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/tests/(.+)': '<rootDir>/tests/$1',
    '^@/(.+)': '<rootDir>/src/$1'
  }
}
