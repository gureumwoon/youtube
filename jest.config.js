/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};