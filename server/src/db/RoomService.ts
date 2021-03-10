import mongoose from "mongoose";
import { Room, IRoom } from "../models/room";
import { Literature, ILiterature } from "../models/literature";

import { getRepository } from "typeorm";

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const addRoom = async () => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
  });
  const data = {
    name: name,
    uniqueLink: name,
  };

  return await getRepository(Room).save(data);
};

export const getRoom = async (id: string) => {
  return await getRepository(Room).findOne(id);
};

export const removeRoom = async (id: string) => {
  return await getRepository(Room).delete({ id: id });
};

export const updateRoomName = async (id: string, data: any) => {
  return await getRepository(Room).update({ id }, data);
};

// export const addLiteratureToRoom = async (id: string, data: ILiterature) => {
//   let room = await getRoom(id);
//   room?.literature?.push(data);
//   return await room?.save();
// };

// export const removeLiteratureFromRoom = async (
//   roomId: string,
//   literatureId: string
// ) => {
//   let room = await getRoom(roomId);
//   let literature = room?.literature?.filter((l) => l._id != literatureId);
//   if (room) room.literature = literature;

//   return await room?.save();
// };
