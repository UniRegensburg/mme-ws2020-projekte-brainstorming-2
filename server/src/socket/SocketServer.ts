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
} from "./impl";

const io = new Server();

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
});

io.on("message", (msg) => {
  io.emit("message", msg);
});

export default io;
