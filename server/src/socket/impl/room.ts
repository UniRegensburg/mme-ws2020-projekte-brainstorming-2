import { Socket } from "socket.io";
import {
  addRoom,
  removeRoom,
  updateRoomName,
  getAll,
  getRoom,
} from "../../db/RoomService";
import {
  IThis,
  WSJoinedResponse,
  WSJoinRoomRequest,
  WSJoinRoomResponse,
} from "../../interfaces";
import {
  WSChangeRoomNameRequest,
  WSChangeRoomNameResponse,
  WSDestroyRoomRequest,
  WSDestroyRoomResponse,
  WSNewRoomRequest,
  WSNewRoomResponse,
} from "../../interfaces/setup";
import { Room } from "../../models/room";

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

/**
 * Join a room
 */
async function JoinRoom(this: IThis, arg: WSJoinRoomRequest, cb: any) {
  const logger = new Log("JoinRoom");
  logger.debug(`Request from ${this.socket.id}`);

  try {
    // Update socket
    this.socket.name = arg.payload.username;
    this.socket.join(arg.payload.roomName);

    // Notify other participants
    this.socket.to(arg.payload.roomName).emit("Joined", {
      type: "Joined",
      payload: { username: arg.payload.username },
    } as WSJoinedResponse);

    let room = await getRoom(arg.payload.roomName);

    // Respond
    cb({
      status: "ok",
      error: null,
      type: "JoinRoom",
      payload: {
        canvas: null,
        room,
      },
    } as WSJoinRoomResponse);
  } catch (error) {
    logger.error(`Error: ${JSON.stringify(error)}`);
    cb({
      status: "error",
      error: "Could not join room",
      type: "JoinRoom",
      payload: {},
    } as WSJoinRoomResponse);
  }
}

export { NewRoom, ChangeRoomName, DestroyRoom, JoinRoom };
