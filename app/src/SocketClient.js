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
      let ev = new Event ("LiteratureRemoved", socket.payload.id);
      this.notifyAll(ev);
    });

    this.ioClient.on("WhiteBoardUpdated", (socket) => {
      let ev = new Event ( "CanvasChanged", socket.payload.data);
      this.notifyAll(ev);
    });

    this.ioClient.on("NameChanged", (socket) => {
      let ev = new Event("UserChangedName", socket.payload);
      this.notifyAll(ev);
    });

    this.ioClient.on("DestroyRoom", (socket) => {
      let ev = new Event("RoomDestroyed");
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
      if(socket.status === "ok"){
        let ev = new Event("RoomDestroyed");
        this.notifyAll(ev);
      }
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
    this.ioClient.emit("ChangeName", { payload }, (socket) => {
      if (socket.status === "ok") {
        let ev = new Event ("ChangedUsername", payload.username);
        this.notifyAll(ev);
      }
    });
  }

}

export default SocketClient;
