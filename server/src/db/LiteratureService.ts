import mongoose from "mongoose";
import Literature, { ILiterature } from "../models/literature";

export const addLiterature = async (data: ILiterature) => {
  const literature = new Literature(data);
  return await literature.save();
};

export const getLiterature = async (id: string) => {
  return await Literature.findById(id);
};
