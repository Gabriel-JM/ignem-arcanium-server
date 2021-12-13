import Jest from '@jest/types'

export default <Jest.Config.InitialOptions> {
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
    '^@/tests/(.+)': '<rootDir>/tests/$1'
  }
}
