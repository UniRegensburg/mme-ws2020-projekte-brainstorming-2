import { Socket } from "socket.io";
import { IThis, WSUpdateWhiteboardRequest } from "../../interfaces";
import { Log } from "../../util/logger";

async function CanvasEvent(
  this: IThis<{ canvasPerRoom: Record<string, any> }>,
  arg: WSUpdateWhiteboardRequest
) {
  const logger = new Log("UpdateWhiteboard");

  logger.debug(`Request from ${this.socket.id}`);
  if (this.socket.room) {
    this.canvasPerRoom[this.socket.room] = arg.payload.data;

    this.socket.to(this.socket.room).emit("WhiteBoardUpdated", arg);
    logger.debug(`Distributed: ${JSON.stringify(arg)}`);
  } else {
    logger.error(`Error: Socket not joined to room`);
  }
}

export { CanvasEvent };
