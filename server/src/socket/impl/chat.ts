import { Socket } from "socket.io";
import {
  IThis,
  WSChangeNameRequest,
  WSChangeNameResponse,
  WSChatMessage,
} from "../../interfaces";
import { Log } from "../../util/logger";

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

async function ChangeName(
  this: IThis<{ userInRoom: Record<string, string[]> }>,
  arg: WSChangeNameRequest,
  cb: any
) {
  const logger = new Log("UsernameChange");
  logger.debug(`Request from ${this.socket.id}`);

  if (this.socket.room) {
    let oldUsername = this.socket.name;

    // get old username from rooms and replace
    let users = this.userInRoom[this.socket.room];
    let i = users.findIndex((n) => n === oldUsername);
    if (i == -1) {
      throw new Error();
    }
    users[i] = arg.payload.username;

    this.socket.name = arg.payload.username;

    this.socket.to(this.socket.room).emit("NameChanged", {
      payload: {
        oldUsername,
        newUsername: this.socket.name,
      },
    });

    cb({
      type: "ChangeName",
      error: null,
      status: "ok",
      payload: {},
    } as WSChangeNameResponse);

    logger.debug(`Distributed: ${JSON.stringify(arg)}`);
  } else {
    logger.error(`Error: Socket not joined to room`);
    cb({
      type: "ChangeName",
      error: "Can't change name",
      status: "error",
      payload: {},
    } as WSChangeNameResponse);
  }
}

export { ChatMessage, ChangeName };
