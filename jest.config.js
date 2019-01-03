
const jestConfig = {
  bail: true,
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/index.js'
  ],
  globals: {
    NODE_ENV: 'test'
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/config/jest/styleMock.js',
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: '<rootDir>/reports/junit'
    }]
  ],
  roots: ['<rootDir>/client/'],
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/config/jest/jest.transformer.js',
  },
  unmockedModulePathPatterns: [
    'node_modules/react/',
    'node_modules/enzyme/'
  ]
}

module.exports = jestConfig
