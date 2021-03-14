// import { Document, model, Schema } from "mongoose";

// export interface ILiterature {
//   name: string;
//   author?: string;
//   link?: string;
//   pages?: number[];
// }

// export interface LiteratureDocument extends ILiterature, Document {}

// export const LiteratureSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   pages: {
//     type: [Number],
//   },
// });

// export default model<LiteratureDocument>("Literature", LiteratureSchema);

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./room";

export interface ILiterature {
  name: string;
  author?: string;
  link?: string;
  pages?: number[];
  owner?: Room;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity()
export class Literature implements ILiterature {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  link: string;

  @Column("simple-array", { nullable: true })
  pages: number[];

  @ManyToOne(() => Room, (room) => room.literature)
  owner: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
