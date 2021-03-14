import { Literature, ILiterature } from "../models/literature";

import { getRepository } from "typeorm";

export const addLiterature = async (data: ILiterature) => {
  return await getRepository(Literature).save(data);
};

export const getLiterature = async (id: string) => {
  return await getRepository(Literature).findOne(id);
};
