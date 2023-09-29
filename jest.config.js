const { getTestMatch } = require('@invenco/common-build-tools/ci/jestUtils');
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+.[tj]sx?$': ['ts-jest', { diagnostics: false, isolatedModules: true }]
  },
  testMatch: getTestMatch(),
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  watchPathIgnorePatterns: ['<rootDir>/pacts/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

module.exports = config;
