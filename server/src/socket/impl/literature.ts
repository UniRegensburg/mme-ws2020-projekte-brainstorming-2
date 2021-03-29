import { addLiterature, removeLiterature } from "../../db/LiteratureService";
import { getRoom } from "../../db/RoomService";
import {
  IThis,
  WSAddLiteratureRequest,
  WSRemoveLiteratureRequest,
} from "../../interfaces";

import { Log } from "../../util/logger";

async function AddLiterature(
  this: IThis,
  arg: WSAddLiteratureRequest,
  cb: any
) {
  const logger = new Log("AddLiterature");
  logger.debug(`Request from ${this.socket.id}`);
  let literature;

  try {
    literature = await addLiterature(arg.payload as any, arg.payload.owner);
  } catch (error) {
    console.log(error);
    logger.error(`Error: ${JSON.stringify(error)}`);
    return cb({
      type: "AddLiterature",
      status: "error",
      error: "Could not add literature",
      payload: {},
    });
  }

  // Inform other participants in room
  this.socket.room &&
    this.socket.to(this.socket.room).emit("AddLiterature", {
      type: "AddLiterature",
      status: "ok",
      error: null,
      payload: {
        literature,
        from: this.socket.name,
      },
    });

  cb({
    type: "AddLiterature",
    status: "ok",
    error: null,
    payload: {
      literature,
      from: this.socket.name,
    },
  });
}

async function RemoveLiterature(
  this: IThis,
  arg: WSRemoveLiteratureRequest,
  cb: any
) {
  const logger = new Log("RemoveLiterature");
  logger.debug(`Request from ${this.socket.id}`);

  try {
    await removeLiterature(arg.payload.literatureId, arg.payload.roomId);
  } catch (error) {
    logger.error(error);
    return cb({
      type: "RemoveLiterature",
      status: "error",
      error: "Could not remove literature",
      payload: {},
    });
  }

  // Inform other participants in room
  this.socket.room &&
    this.socket.to(this.socket.room).emit("LiteratureRemoved", {
      type: "RemoveLiterature",
      status: "ok",
      error: null,
      payload: {
        id: arg.payload.literatureId,
      },
    });

  cb({
    type: "RemoveLiterature",
    status: "ok",
    error: null,
    payload: {
      id: arg.payload.literatureId,
    },
  });
}

export { AddLiterature, RemoveLiterature };
