import { request } from "chai-http";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { server } from "../../server.js";
import { createNewUser, generateToken } from "../utils.js";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

describe("Create booking", () => {
  let mongoUser;
  let token;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoUser = await createNewUser();
    token = generateToken(mongoUser);
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("POST /bookings", () => {
    it("should create new booking (with token)", async () => {
      const res = await request
        .execute(server.app)
        .post("/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: "2024-12-05",
          startTime: "08:30",
          endTime: "12:30",
        });
      expect(res.status).to.equal(201);
      expect(res.body._id).to.be.a("string");
      expect(res.body.startTime).to.equal("08:30");
      expect(res.body.endTime).to.equal("12:30");
    });

    it("should return auth error (without token)", async () => {
      const res = await request.execute(server.app).post("/bookings").send({
        date: "2024-12-05",
        startTime: "08:30",
        endTime: "12:30",
      });
      expect(res.status).to.equal(401);
    });

    it("should return error (the time-range is already booked)", async () => {
      const res = await request
        .execute(server.app)
        .post("/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: "2024-12-05",
          startTime: "09:30",
          endTime: "11:30",
        });

      expect(res.status).to.equal(400);
    });
  });
});
