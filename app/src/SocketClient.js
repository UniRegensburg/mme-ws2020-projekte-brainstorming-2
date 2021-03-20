/* eslint-env browser */

import { io } from "socket.io-client";

class SocketClient {
  constructor() {
    this.ioClient = io.connect("http://localhost:8000");
    this.roomId = "";
    this.roomName = "";
    this.roomLink = "";
  }

  start() {
    this.ioClient.on("connection", (socket) => {
      console.log("Connected");
    });
  }

  requestNewRoom() {
    this.ioClient.emit("NewRoom", {}, (socket) => {
      console.log(socket);
      if (socket.status === "ok") {
        this.roomId = socket.payload.id;
        this.roomName = socket.payload.name;
        this.roomLink = socket.payload.link;
      }
    });
  }

  requestJoinRoom() {
    let payload = { username: "AUser", roomName: this.roomLink };
    console.log(this.roomLink); // pleased-azure-cat
    this.ioClient.emit("JoinRoom", { payload }, (socket) => {
      console.log(socket);
    });
  }
}

export default SocketClient;
