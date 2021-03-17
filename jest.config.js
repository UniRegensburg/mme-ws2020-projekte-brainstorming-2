const ts_preset = require("ts-jest/jest-preset");

module.exports = {
  ...ts_preset,
  testEnvironment: "node",
  clearMocks: true,
  watchIgnorePatterns: ["globalConfig"],
  setupFiles: ["dotenv/config"],
};
