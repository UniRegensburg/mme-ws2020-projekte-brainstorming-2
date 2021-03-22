/* eslint-env browser */

import { io } from "socket.io-client";
import Config from "./Config.js";
import Observable, { Event } from "./Observable";

class SocketClient extends Observable{

  constructor() {
    super();
    this.ioClient = io.connect(Config.DEAFULT_SERVER_URL);
    this.roomId = "";
    this.roomName = "";
    this.roomLink = "";
  }

  start() {

    this.ioClient.on("connection", (socket) => {
      console.log("SocketClient: Connected");
    });

    this.ioClient.on("Joined", (socket) => {
      console.log("SocketClient: A new User Joined the room");
      console.log(socket);
    });

    this.ioClient.on("ChatMessage", (socket) => {
      let ev = new Event("NewChatMessage", socket.payload.message);
      console.log("SocketClient: Message received");
    });

  }

  requestNewRoom() {
    this.ioClient.emit("NewRoom", {}, (socket) => {
      if (socket.status === "ok") {
        this.roomId = socket.payload.id;
        this.roomName = socket.payload.name;
        this.roomLink = socket.payload.link;
        let ev = new Event("NewRoomCreated", this.roomLink);
        this.notifyAll(ev);
        console.log("SocketClient: New Room created");
        console.log(this.roomLink);
      }
    });
  }

  requestJoinRoom(username, roomLink) {
    let payload = { username: username, roomName: roomLink };
    this.ioClient.emit("JoinRoom", { payload }, (socket) => {
      console.log("SocketClient: Joined Room");
      console.log(socket);
    });
  }

  sendMessage(ChatMessage){
    let payload = { message: ChatMessage};
    this.ioClient.emit( "ChatMessage", { payload });
    console.log("SocketClient: Sended Message");
  }

  requestAddLiterature(literature){
    let payload = literature ;
    this.ioClient.emit( "AddLiterature", { payload }, (socket) => {
      if (socket.status === "ok"){
        console.log("SocketClient: literatureAdded, status ok");
      }

    });
  }

}

export default SocketClient;
