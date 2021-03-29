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
      let ev = new Event ("UserJoined", socket.payload.username);
      this.notifyAll(ev);
    });

    this.ioClient.on("ChatMessage", (socket) => {
      let ev = new Event("NewChatMessage", socket.payload);
      this.notifyAll(ev);
    });

    this.ioClient.on("RoomNameChanged", (socket) => {
      let ev = new Event ("RoomNameChanged", socket.payload.newName);
      this.notifyAll(ev);
    });

    this.ioClient.on("AddLiterature", (socket) => {
      let ev = new Event ("LiteratureAdded", socket.payload.literature );
      this.notifyAll(ev);
    });

    this.ioClient.on("LiteratureRemoved", (socket) => {
      console.log("removed");
      let ev = new Event ("LiteratureRemoved", socket.payload.id);
      this.notifyAll(ev);
    });

    this.ioClient.on("WhiteBoardUpdated", (socket) => {
      let ev = new Event ( "CanvasChanged", socket.payload.data);
      this.notifyAll(ev);
    });

    this.ioClient.on("NameChanged", (socket) => {
      console.log(socket);
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
      } else {
          this.notifyAll("CreateRoomFailed");
      }
    });
  }

  requestRenameRoom(payload){
    this.ioClient.emit("ChangeRoomName", { payload }, (socket) => {
      if(socket.status === "ok"){
        let ev = new Event ("RoomNameChanged", socket.payload.name);
        this.notifyAll(ev);
      }
    });
  }

  requestJoinRoom (payload) {
    this.ioClient.emit("JoinRoom", { payload }, (socket) => {
      if (socket.status === "ok" ) {
        this.roomId = socket.payload.room.id;
        this.roomLink = socket.payload.room.link;
        this.roomName = socket.payload.room.name;
        let ev = new Event ("JoinedRequestedRoom", socket.payload);
        this.notifyAll(ev);
      } else {
        this.notifyAll( new Event ("JoinRoomFailed") );
      }
    });
  }

  requestDestroyRoom(){
    let payload = {id: this.roomId};
    this.ioClient.emit("DestroyRoom", { payload }, (socket) => {
      console.log(socket);
    });
  }

  sendMessage(payload){
    this.ioClient.emit( "ChatMessage", { payload });
  }

  requestAddLiterature(Literature){
    let payload = Literature;
        payload.owner = this.roomId;
    this.ioClient.emit( "AddLiterature", { payload }, (socket) => {
      if (socket.status === "ok"){
        console.log(socket);
        let ev = new Event ("LiteratureAdded", socket.payload.literature );
        this.notifyAll(ev);
      } else {
        this.notifyAll( new Event("AddLiteratureFailed"));
      }
    });
  }

  requestRemoveLiterature(id){
    let payload = {roomId: this.roomId,
                  literatureId: id.toString() };
    this.ioClient.emit("RemoveLiterature", { payload }, (socket) => {
      if(socket.status === "ok"){
        let ev = new Event ("LiteratureRemoved", socket.payload.id);
        this.notifyAll(ev);
      }
    });
  }

  requestUpdateCanvas(canvas){
    let payload = {
      data: canvas,
    };
    this.ioClient.emit("WhiteBoardUpdated", { payload });
  }

  requestChangeUsername(username){
    let payload = {
      username: username.toString(),  
    };
    console.log(payload);
    this.ioClient.emit("ChangeName", { payload }, (socket) => {
      console.log("ResponseforUsername");
      if (socket.status === "ok") {
        let ev = new Event ("ChangedUsername", socket.payload.username);
        this.notifyAll(ev);
      }
    });
  }

}

export default SocketClient;
