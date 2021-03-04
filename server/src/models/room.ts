import { Document, model, Schema } from "mongoose";
import { LiteratureDocument } from "./literature";

export interface IRoom {
  name: string;
  uniqueLink: string;
  literature?: LiteratureDocument["_id"][];
  dataUri?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface RoomDocument extends IRoom, Document {}

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uniqueLink: {
      type: String,
      required: true,
    },
    literature: [{ type: Schema.Types.ObjectId }],
    dataUri: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model<RoomDocument>("Room", RoomSchema);
