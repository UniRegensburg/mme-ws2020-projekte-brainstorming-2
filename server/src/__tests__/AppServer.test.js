const AppServer = require("../AppServer.js");

describe("AppServer", () => {
  it("should create new Server", () => {
    let server = new AppServer("");

    expect(typeof server.appDir).toBe("string");
  });
});
