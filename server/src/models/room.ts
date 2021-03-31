import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Literature } from "./literature";

export interface IRoom {
  id: string;
  name: string;
  uniqueLink: string;
  literature: Literature[];
  createdAd: Date;
  updatedAt: Date;
}

@Entity()
export class Room implements IRoom {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  uniqueLink!: string;

  @OneToMany((type) => Literature, (literature) => literature.owner, {
    eager: true,
    onDelete: "CASCADE",
  })
  literature!: Literature[];

  @CreateDateColumn()
  createdAd!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
