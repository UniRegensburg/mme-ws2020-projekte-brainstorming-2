import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
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
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  author!: string;

  @Column({ nullable: true })
  link!: string;

  @Column("simple-array", { nullable: true })
  pages!: number[];

  @ManyToOne(() => Room, (room) => room.literature, { onDelete: "CASCADE" })
  owner!: Room;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
