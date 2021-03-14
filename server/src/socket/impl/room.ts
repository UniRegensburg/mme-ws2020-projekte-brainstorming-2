import { Socket } from "socket.io";
import {
  addRoom,
  removeRoom,
  updateRoomName,
  getAll,
} from "../../db/RoomService";
import { IThis } from "../../interfaces";
import {
  WSChangeRoomNameRequest,
  WSChangeRoomNameResponse,
  WSDestroyRoomRequest,
  WSDestroyRoomResponse,
  WSNewRoomRequest,
  WSNewRoomResponse,
} from "../../interfaces/setup";

import { Log } from "../../util/logger";

/**
 * Add a new Room
 */
async function NewRoom(this: IThis, arg: WSNewRoomRequest, cb: any) {
  const logger = new Log("NewRoom");

  logger.debug(`Request from ${this.socket.id}`);
  let room;
  try {
    room = await addRoom();
  } catch (error) {
    logger.error(`Error: ${JSON.stringify(error)}`);
  }

  const response: WSNewRoomResponse = room
    ? {
        status: "ok",
        error: null,
        type: "NewRoom",
        payload: {
          id: room.id,
          name: room.name,
          link: room.uniqueLink,
        },
      }
    : {
        status: "error",
        error: "Could not create room",
        type: "NewRoom",
        payload: {
          id: "",
          name: "",
          link: "",
        },
      };

  cb(response);
}

/**
 * Change the name of a room
 */
async function ChangeRoomName(
  this: IThis,
  arg: WSChangeRoomNameRequest,
  cb: any
) {
  const logger = new Log("ChangeRoomName");

  logger.debug(`Request from ${this.socket.id}`);
  logger.debug(`Payload: ${JSON.stringify(arg)}`);

  try {
    await updateRoomName(arg.payload.id, {
      name: arg.payload.name,
    });
  } catch (error) {
    logger.error(`Error: ${JSON.stringify(error)}`);
    return cb({
      status: "error",
      error: "Could not find room",
      type: "ChangeRoomName",
      payload: {
        name: "",
      },
    });
  }

  const response: WSChangeRoomNameResponse = {
    status: "ok",
    error: null,
    type: "ChangeRoomName",
    payload: {
      name: arg.payload.name,
    },
  };

  cb(response);
}

/**
 * Change the name of a room
 */
async function DestroyRoom(this: IThis, arg: WSDestroyRoomRequest, cb: any) {
  const logger = new Log("DestroyRoom");
  logger.debug(`Request from ${this.socket.id}`);

  try {
    await await removeRoom(arg.payload.id);
  } catch (error) {
    logger.error(`Error: ${JSON.stringify(error)}`);
    return cb({
      status: "error",
      error: "Could not find room",
      type: "DestroyRoom",
      payload: {
        name: "",
      },
    });
  }

  const response: WSDestroyRoomResponse = {
    status: "ok",
    error: null,
    type: "DestroyRoom",
  };

  cb(response);
}

export { NewRoom, ChangeRoomName, DestroyRoom };
