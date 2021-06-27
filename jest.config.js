module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageReporters: ["text", "text-summary", "html"],
};
