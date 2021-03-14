/* eslint-disable one-var */
/* eslint-env node */
import { Server } from "socket.io";
import { ChatMessage } from "./impl/chat";

import { ChangeRoomName, DestroyRoom, NewRoom } from "./impl/room";

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

  socket.on("Test", () => {
    io.emit("Test", "kam an");
  });
});

io.on("message", (msg) => {
  io.emit("message", msg);
});

export default io;
