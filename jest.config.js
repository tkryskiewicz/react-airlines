module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
  ],
  setupFiles: [
    "<rootDir>/tests/test-setup.ts",
  ],
  testMatch: [
    "**/*.test.(ts|tsx)",
  ],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
};
