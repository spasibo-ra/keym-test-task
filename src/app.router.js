import { Router } from "express";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { responseHandler } from "./middlewares/responseHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import bookingRouter from "./booking/booking.router.js";
import authRouter from "./auth/auth.router.js";

class MainRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.use(authRouter)
    this.router.use(bookingRouter);
    this.router.use(responseHandler);
    this.router.use(notFoundHandler);
    this.router.use(errorHandler);
  }

}

export default new MainRouter().router;
