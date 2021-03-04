import { Document, model, Schema } from "mongoose";

export interface ILiterature {
  name: string;
  author?: string;
  link?: string;
  pages?: number[];
}

export interface LiteratureDocument extends ILiterature, Document {}

export const LiteratureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  link: {
    type: String,
  },
  pages: {
    type: [Number],
  },
});

export default model<LiteratureDocument>("Literature", LiteratureSchema);
