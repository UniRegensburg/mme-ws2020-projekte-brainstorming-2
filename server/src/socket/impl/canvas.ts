import { Socket } from "socket.io";
import { WSUpdateWhiteboardRequest } from "../../interfaces";
import { Log } from "../../util/logger";

interface IThis {
  socket: Socket & {
    name?: string;
    room?: string;
  };
}

async function CanvasEvent(this: IThis, arg: WSUpdateWhiteboardRequest) {
  const logger = new Log("UpdateWhiteboard");

  logger.debug(`Request from ${this.socket.id}`);
  if (this.socket.room) {
    this.socket.to(this.socket.room).emit("WhiteBoardUpdated", arg);
    logger.debug(`Distributed: ${JSON.stringify(arg)}`);
  } else {
    logger.error(`Error: Socket not joined to room`);
  }
}

export { CanvasEvent };
