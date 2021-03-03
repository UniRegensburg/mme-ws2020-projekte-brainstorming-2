/* eslint-disable one-var */
/* eslint-env node */

import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {});

io.on("message", (msg) => {
  io.emit("message", msg);
});

export default io;
