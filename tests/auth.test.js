import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { server } from "../server.js";
import UserModel from "../src/user/user.model.js";
import { createNewUser, testUsers } from "./utils.js";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

describe("Auth", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await UserModel.deleteMany();
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("POST /register", () => {
    it("should register a user with valid data", async () => {
      const response = await chai.request
        .execute(server.app)
        .post("/register")
        .send(testUsers[0])
      expect(response.status).to.equal(201);
    });

    it("should return error if user already exists", async () => {
      await createNewUser();
      const response = await chai.request
        .execute(server.app)
        .post("/register")
        .send(testUsers[0]);
      expect(response.status).to.equal(400);
    });
  });

  describe("POST /login", () => {
    it("should login the user and return a token", async () => {
      const { login, password } = testUsers[0];
      await createNewUser();
      const response = await chai.request
        .execute(server.app)
        .post("/login")
        .send({ login, password });
      expect(response.status).to.equal(200);
      expect(response.body.accessToken).to.not.be.null;
    });

    it("should return error for invalid credentials", async () => {
      const { login, password } = testUsers[0];
      const badPass = password + "YooHoo";
      await createNewUser();
      const response = await chai.request
        .execute(server.app)
        .post("/login")
        .send({ login, password: badPass });
      expect(response.status).to.equal(401);
    });
  });
});
