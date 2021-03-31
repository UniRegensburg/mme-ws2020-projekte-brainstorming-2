import { Literature, ILiterature } from "../models/literature";

import { getConnection, getRepository } from "typeorm";
import { Room } from "../models/room";

export const addLiterature = async (data: ILiterature, room: string) => {
  let literature = await getRepository(Literature).save(data);

  console.log(room);

  // await getConnection()
  //   .createQueryBuilder()
  //   .relation(Room, "literature")
  //   .of(room)
  //   .add(literature.id);

  //let literature = await getRepository(Literature).findOne({});

  return literature;
};

export const getLiterature = async (id: string) => {
  return await getRepository(Literature).findOne(id);
};

export const removeLiterature = async (literaturId: string, roomId: string) => {
  return await getConnection()
    .createQueryBuilder()
    .relation(Room, "literature")
    .of(roomId)
    .remove(literaturId);
};
