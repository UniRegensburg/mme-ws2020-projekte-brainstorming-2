const ts_preset = require("ts-jest/jest-preset");
const mongo_preset = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...ts_preset,
  ...mongo_preset,
  testEnvironment: "node",
  clearMocks: true,
};
