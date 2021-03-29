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
      let ev = new Event ("UserJoined", socket.payload.username);
      this.notifyAll(ev);
    });

    this.ioClient.on("ChatMessage", (socket) => {
      let ev = new Event("NewChatMessage", socket.payload);
      console.log(socket.payload);
      this.notifyAll(ev);
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
        console.log(socket.payload);
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
    this.ioClient.emit("ChangeRoomName", { payload }, (socket) => {
      console.log(socket.name);
    });
  }

  requestJoinRoom (payload) {
    this.ioClient.emit("JoinRoom", { payload }, (socket) => {
      if (socket.status === "ok" ) {
        let ev = new Event ("JoinedRequestedRoom", socket.payload);
        this.notifyAll(ev);
        this.roomId = socket.payload.room.id;
        this.roomLink = socket.payload.room.link;
        this.roomName = socket.payload.room.name;
      } else {
        this.notifyAll( new Event ("JoinRoomFailed") );
      }
    });
  }

  sendMessage(payload){
    this.ioClient.emit( "ChatMessage", { payload });
    console.log("SocketClient: Sended Message");
  }

  requestAddLiterature(Literature){
    let payload = Literature;
    this.ioClient.emit( "AddLiterature", { payload }, (socket) => {
      if (socket.status === "ok"){
        let ev = new Event ("LiteratureAdded", socket.payload);
        this.notifyAll(ev);
        console.log("SocketClient: literatureAdded, status ok");
      } else {
        console.log(socket);
        this.notifyAll( new Event("AddLiteratureFailed"));
      }
    });
  }

  requestRemoveLiterature(payload){
    this.ioClient.emit("RemoveLiterature", { payload }, (socket) => {
      console.log(socket);
    });
  }

}

export default SocketClient;
