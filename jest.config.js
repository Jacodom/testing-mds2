module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: [
    "**/unit/**/*.test.ts",
    "**/unit/**/*.spec.ts",
    "**/__tests__/**/*.ts",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/*.interface.ts",
    "!src/**/*.type.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "clover"],
  //   coverageThreshold: {
  //     global: {
  //       branches: 40,
  //       functions: 40,
  //       lines: 30,
  //       statements: 30,
  //     },
  //   },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // Comentado temporalmente
  testTimeout: 10000,
  verbose: true,
  // Simplificamos reporters - Allure solo para Playwright por ahora
  reporters: ["default"],
};
