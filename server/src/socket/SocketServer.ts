/* eslint-disable one-var */
/* eslint-env node */
import { Server } from "socket.io";
import { addRoom, removeRoom, updateRoomName } from "../db/RoomService";
import {
  WSChangeRoomNameRequest,
  WSChangeRoomNameResponse,
  WSDestroyRoomRequest,
  WSDestroyRoomResponse,
  WSNewRoomRequest,
  WSNewRoomResponse,
} from "../interfaces/setup";

const io = new Server();

io.on("connection", (socket) => {
  /**
   * Create Room
   */
  socket.on("NewRoom", async (arg: WSNewRoomRequest, cb: any) => {
    let room;
    try {
      room = await addRoom();
    } catch (error) {
      console.error(error);
    }

    const response: WSNewRoomResponse = room
      ? {
          status: "ok",
          error: null,
          type: "NewRoom",
          payload: {
            name: room.name,
            link: room.uniqueLink,
          },
        }
      : {
          status: "error",
          error: "Could not create room",
          type: "NewRoom",
          payload: {
            name: "",
            link: "",
          },
        };

    cb(response);
  });

  /**
   * Rename Room
   */
  socket.on("ChangeRoomName", async (arg: WSChangeRoomNameRequest, cb: any) => {
    const room = await updateRoomName(arg.payload.id, {
      name: arg.payload.name,
    });

    const response: WSChangeRoomNameResponse = room
      ? {
          status: "ok",
          error: null,
          type: "ChangeRoomName",
          payload: {
            name: room?.name,
          },
        }
      : {
          status: "error",
          error: "Could not find room",
          type: "ChangeRoomName",
          payload: {
            name: "",
          },
        };

    cb(response);
  });

  /**
   * Destroy Room
   */
  socket.on("DestroyRoom", async (arg: WSDestroyRoomRequest, cb: any) => {
    const room = await removeRoom(arg.payload.id);

    const response: WSDestroyRoomResponse =
      room.ok === 1
        ? {
            status: "ok",
            error: null,
            type: "DestroyRoom",
          }
        : {
            status: "error",
            error: "Could not remove room",
            type: "DestroyRoom",
          };

    cb(response);
  });
});

io.on("message", (msg) => {
  io.emit("message", msg);
});

export default io;
