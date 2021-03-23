/* eslint-env browser */

import { io } from "socket.io-client";
import { createKeywordTypeNode } from "typescript";
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
      let ev = new Event ("UserJoined", socket.payload.username);
      this.notifyAll(ev);
    });

    this.ioClient.on("ChatMessage", (socket) => {
      let ev = new Event("NewChatMessage", socket.payload.message);
      console.log("SocketClient: Message received");
    });

    this.ioClient.on("ChangeRoomName", (socket) => {
      console.log("SocketClient: RoomNameChanged");
      let ev = new Event ("NewRoomName", socket.payload.name);
      this.notifyAll(ev);
    });

  }

  requestNewRoom() {
    this.ioClient.emit("NewRoom", {}, (socket) => {
      if (socket.status === "ok") {
        this.roomId = socket.payload.id;
        this.roomName = socket.payload.name;
        this.roomLink = socket.payload.link;
        let ev = new Event( "NewRoomCreated", socket.payload);
        this.notifyAll(ev);
        console.log("SocketClient: New Room created");
        console.log(this.roomName);
      } else {
          this.notifyAll("CreateRoomFailed");
      }
    });
  }

  requestRenameRoom(payload){
    console.log(payload);
    this.ioClient.emit("ChangeRoomName", { payload }, (socket) => {
      console.log(socket.payload);
    });
  }

  requestJoinRoom (payload) {
    this.ioClient.emit("JoinRoom", { payload }, (socket) => {
      if (socket.status === "ok" ) {
        let ev = new Event ("JoinedRequestedRoom", socket.payload.room);
        this.notifyAll(ev);
      } else {
        this.notifyAll( new Event ("JoinRoomFailed") );
      }
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
        let ev = new Event ("LiteratureAdded", socket.payload);
        this.notifyAll(ev);
        console.log("SocketClient: literatureAdded, status ok");
      } else {
        this.notifyAll( new Event("AddLiteratureFailed"));
      }
    });
  }

}

export default SocketClient;
