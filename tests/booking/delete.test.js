import { request } from "chai-http";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { server } from "../../server.js";
import { createBooking, createNewUser, generateToken } from "../utils.js";
import BookingModel from "../../src/booking/booking.model.js";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

describe("Delete booking", () => {
  let booking;
  let token;
  let user;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    user = await createNewUser();
    token = generateToken(user);
  });

  beforeEach(async () => {
    booking = await createBooking(user._id);
  });

  afterEach(async () => {
    await BookingModel.deleteMany();
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("DELETE /bookings/{id}", () => {
    it("should delete new booking (with token)", async () => {
      const res = await request
        .execute(server.app)
        .delete(`/bookings/${booking._id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(res.status).to.equal(204);
    });

    it("should return auth error (without token)", async () => {
      const res = await request
        .execute(server.app)
        .delete(`/bookings/${booking._id}`);
      expect(res.status).to.equal(401);
    });
  });
});
