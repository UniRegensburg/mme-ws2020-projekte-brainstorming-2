import { Socket } from "socket.io";
import { Log } from "../../util/logger";

interface IThis {
  socket: Socket & {
    name?: string;
    room?: string;
  };
}

async function ChatMessage(this: IThis, arg: WSChatMessage) {
  const logger = new Log("ChatMessage");

  logger.debug(`Request from ${this.socket.id}`);
  if (this.socket.room) {
    this.socket.to(this.socket.room).emit("ChatMessage", arg);
    logger.debug(`Distributed: ${JSON.stringify(arg)}`);
  } else {
    logger.error(`Error: Socket not joined to room`);
  }
}

export { ChatMessage };
