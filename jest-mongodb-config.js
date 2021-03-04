// see https://javascript.plainenglish.io/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-103b772ee164

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "latest", // Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
};
