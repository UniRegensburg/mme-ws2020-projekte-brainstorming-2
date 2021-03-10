import { createConnection, getConnection } from "typeorm";
import { Literature, ILiterature } from "../src/models/literature";
import { Room, IRoom } from "../src/models/room";

import { addRoom, removeRoom } from "../src/db/RoomService";
import { addLiterature } from "../src/db/LiteratureService";

const roomData = {
  name: "testRoom",
  uniqueLink: "oiwenfoiwen",
  //dataUri: "/rooms/oiwenfoiwen",
};

describe("Room Model", () => {
  beforeAll(async () => {
    await createConnection({
      type: "sqlite",
      database: "./test.sql",
      name: "default",
      entities: [Room, Literature],
      logging: false,
      dropSchema: true,
      synchronize: true,
    });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe("Create", () => {
    it("creates and saves room succesfully", async () => {
      const room = await addRoom();

      expect(room.id).toBeDefined();
      expect(room.name.split("-").length).toBe(3);
    });

    it.todo("removes room");
  });
});

const literatureData = {
  name: "Buch",
  author: "Peter",
  pages: [10, 20],
  link: "http://google.com",
};

describe("Literature Model", () => {
  beforeAll(async () => {
    await createConnection({
      type: "sqlite",
      database: "./test.sql",
      name: "default",
      entities: [Room, Literature],
      logging: true,
      dropSchema: true,
      synchronize: true,
    });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe("Create", () => {
    it.todo("creates and saves literature succesfully");

    it.todo("removes literature");
  });
});
