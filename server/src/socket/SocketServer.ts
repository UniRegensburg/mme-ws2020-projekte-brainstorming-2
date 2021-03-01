/* eslint-disable one-var */
/* eslint-env node */

import { Server } from "socket.io";

const io = new Server({
  path: "/ws",
});

io.on("connection", () => {
  console.log("Connection");
});

export default io;
