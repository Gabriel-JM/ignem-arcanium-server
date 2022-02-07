import Jest from '@jest/types'

const runTypeArg = process.argv.find(arg => arg.startsWith('--runType='))

const runType = runTypeArg
  ? runTypeArg.substring('--runType='.length)
  : ''

export default <Jest.Config.InitialOptions> {
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/' + runType],
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
