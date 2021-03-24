/* eslint-disable one-var */
/* eslint-env node */
import { Server } from "socket.io";

import {
  ChangeRoomName,
  DestroyRoom,
  NewRoom,
  ChatMessage,
  AddLiterature,
  RemoveLiterature,
  JoinRoom,
  GetAll,
} from "./impl";
import { CanvasEvent } from "./impl/canvas";

const io = new Server();

const userInRoom: Record<string, string[]> = {};

io.on("connection", (socket) => {
  /**
   * Create Room
   */
  socket.on("NewRoom", NewRoom.bind({ socket }));

  /**
   * Rename Room
   */
  socket.on("ChangeRoomName", ChangeRoomName.bind({ socket }));

  /**
   * Destroy Room
   */
  socket.on("DestroyRoom", DestroyRoom.bind({ socket }));

  /**
   * Chat Message
   */
  socket.on("ChatMessage", ChatMessage.bind({ socket }));

  /**
   * Add Literature
   */
  socket.on("AddLiterature", AddLiterature.bind({ socket }));

  /**
   * Remove Literature
   */
  socket.on("RemoveLiterature", RemoveLiterature.bind({ socket }));

  /**
   * Join Room
   */
  socket.on("JoinRoom", JoinRoom.bind({ socket, userInRoom }));

  /**
   * Canvas Event
   */
  socket.on("WhiteBoardUpdated", CanvasEvent.bind({ socket }));

  socket.on("GetAll", GetAll.bind({ socket }));
});

io.on("message", (msg) => {
  io.emit("message", msg);
});

export default io;
