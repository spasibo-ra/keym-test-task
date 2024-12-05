import { Router } from "express";

import requestValidate from "../middlewares/requestValidate.js";
import { authHandler } from "../middlewares/authHandler.js";
import { paginateResponse, paginationMiddleware } from "../middlewares/paginationHandler.js"

import { createBookingSchema } from "./booking.schema.js";

import { getAllBookings } from "./methods/getAllBookings.js";
import { createBooking } from "./methods/createBooking.js";
import { getBookingById } from "./methods/getById.js";
import { deleteBooking } from "./methods/deleteBooking.js";

class BookingRouter {
  #path = "/bookings";
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get(`${this.#path}`, this.getAllBookingMiddlewares);
    this.router.get(`${this.#path}/:id`, this.getBookingByIdMiddlewares);
    this.router.post(`${this.#path}`, this.createBookingMiddlewares);
    this.router.delete(`${this.#path}/:id`, this.deleteBookingMiddleware);
  }

  get getAllBookingMiddlewares() {
    return [paginationMiddleware, getAllBookings, paginateResponse];
  }

  get getBookingByIdMiddlewares() {
    return [getBookingById];
  }

  get createBookingMiddlewares() {
    return [authHandler, requestValidate(createBookingSchema), createBooking];
  }

  get deleteBookingMiddleware() {
    return [authHandler, deleteBooking];
  }
}

export default new BookingRouter().router;
