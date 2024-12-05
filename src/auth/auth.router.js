import { Router } from "express";
import { loginHandler } from "./methods/login.js";
import { registerHandler } from "./methods/register.js";
import requestValidate from "../middlewares/requestValidate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

class AuthRouter {
  #path = "/";
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.post(`${this.#path}login`, this.loginMiddlewares);
    this.router.post(`${this.#path}register`, this.registerMiddlewares);
  }

  get loginMiddlewares() {
    return [
      requestValidate(loginSchema),
      loginHandler
    ]
  }

  get registerMiddlewares() {
    return [
      requestValidate(registerSchema),
      registerHandler
    ]
  }
}

export default new AuthRouter().router;
