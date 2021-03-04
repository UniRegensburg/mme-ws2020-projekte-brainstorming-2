import mongoose from "mongoose";
import Literature, { ILiterature } from "../src/models/literature";
import Room, { IRoom } from "../src/models/room";

const roomData: IRoom = {
  name: "testRoom",
  uniqueLink: "oiwenfoiwen",
  dataUri: "/rooms/oiwenfoiwen",
};

describe("Room Model", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("Create", () => {
    it("creates and saves room succesfully", async () => {
      const valid = new Room(roomData);
      const saved = await valid.save();

      expect(saved._id).toBeDefined();
      expect(saved.name).toBe("testRoom");
    });

    it("creates and saves room without wrong fields", async () => {
      const invalid = new Room({ ...roomData, invalid: true });
      const saved = await invalid.save();

      expect(saved._id).toBeDefined();
      expect((saved as any).invalid).toBeUndefined();
    });

    it("does not create room with required field", async () => {
      const invalid = new Room({ name: "invalid" } as any);
      let err;

      try {
        const saved = await invalid.save();
      } catch (error) {
        err = error;
      }

      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.uniqueLink).toBeDefined();
    });
  });
});

const literatureData: ILiterature = {
  name: "Buch",
  author: "Peter",
  pages: [10, 20],
  link: "http://google.com",
};

describe("Literature Model", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("Create", () => {
    it("creates and saves literature succesfully", async () => {
      const valid = new Literature(literatureData);
      const saved = await valid.save();

      expect(saved._id).toBeDefined();
      expect(saved.name).toBe("Buch");
    });

    it("creates and saves literature without wrong fields", async () => {
      const invalid = new Literature({ ...literatureData, invalid: true });
      const saved = await invalid.save();

      expect(saved._id).toBeDefined();
      expect((saved as any).invalid).toBeUndefined();
    });

    it("does not create literature with required field", async () => {
      const invalid = new Literature({ author: "invalid" });
      let err;

      try {
        const saved = await invalid.save();
      } catch (error) {
        err = error;
      }

      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.name).toBeDefined();
    });
  });
});
