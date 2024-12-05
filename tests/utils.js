import UserModel from "../src/user/user.model.js";
import { hash } from "../src/utils/hash.js";
import AuthService from "../src/auth/auth.service.js";
import BookingModel from "../src/booking/booking.model.js";
import timeToMinutes from "../src/utils/timeToMinutes.js";

const testUsers = [
  {
    login: "firsttestuser",
    password: "Qwerty123",
    email: "first@spasibo.ra",
  },
  {
    login: "secondtestuser",
    password: "Qwerty123",
    email: "second@spasibo.ra",
  },
];

const testBooking = {
  date: "2024-12-05",
  startTime: "08:30",
  endTime: "12:30",
};

const createNewUser = async (index = 0) => {
  const { login, email } = testUsers[index];
  const password = await hash(testUsers[index].password);
  const result = await new UserModel({ login, password, email }).save();
  return result;
};

const generateToken = (user) => {
  return AuthService.createToken(user);
};

const createBooking = async (user) => {
  const { startTime, endTime } = testBooking;
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const booking = await BookingModel({user, ...testBooking, start, end}).save();
  return booking;
};

export { testUsers, createNewUser, generateToken, createBooking };
