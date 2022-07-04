/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  forceExit: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "./src/core/",
    "./src/templates/",
    "./src/common.ts",
    "./src/exports.ts",
  ],
  coverageDirectory: "./.coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ["./src/__tests__/setup.ts"],
  testMatch: ["**/**/*.test.ts"],
  moduleNameMapper: {
    "^@App/(.*)$": "<rootDir>/src/$1",
    "^@AppExports": "<rootDir>/src/exports",
    "^@Controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@Middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@Models/(.*)$": "<rootDir>/src/models/$1",
  },
};
