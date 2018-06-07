module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
  ],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/tests/styleMock.ts",
  },
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
