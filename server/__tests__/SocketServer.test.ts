import { io, Socket } from "socket.io-client";
import server from "../src/socket/SocketServer";
import { Server } from "socket.io";
//const io = require("socket.io-client");
// const server = require("../dist/socket/SocketServer");

describe("Socket Server", () => {
  var socket: Socket;
  var srv: Server;

  beforeAll(() => {
    srv = server.listen(3000);
  });

  beforeEach(function (done) {
    socket = io("http://localhost:3000", {
      reconnectionDelay: 0,
      forceNew: true,
    });

    socket.on("connect", () => {
      console.log("Connected");
      done();
    });
  });

  afterEach(function (done) {
    if (socket.connected) {
      socket.disconnect();
    }

    done();
  });

  afterAll(() => {
    if (srv) srv.close();
  });

  it("should echo", function () {
    socket.emit("message", "hi");

    socket.once("message", (msg: string) => {
      expect(msg).toEqual("hi");
    });
  });
});
