import { io, Socket } from "socket.io-client";
import server from "../src/socket/SocketServer";
import { Server } from "socket.io";
import {
  WSChangeRoomNameResponse,
  WSNewRoomResponse,
} from "../src/interfaces/setup";
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

  describe("Rooms", () => {
    let roomId: string;

    it("should create a new room", (done) => {
      console.log(process.env.MONGO_URI);
      socket.emit(
        "NewRoom",
        {
          type: "NewRoom",
        },
        (response: WSNewRoomResponse) => {
          console.log(response);
          roomId = response.payload.name;
          expect(response).toBeDefined();
          expect(response.status).toEqual("ok");
          expect(response.payload.name.split("-").length).toBe(3);
          done();
        }
      );
    });

    it("should rename room", (done) => {
      socket.emit(
        "ChangeRoomName",
        {
          type: "ChangeRoomName",
          payload: {
            name: "neu",
            id: roomId,
          },
        },
        (response: WSChangeRoomNameResponse) => {
          expect(response).toBeDefined();
          expect(response.payload.name).toBeDefined();
          expect(response.payload.name).toEqual("neu");
          done();
        }
      );
    });

    it("should destroy room", () => {});
  });
});
