import wrap from "../../utils/wrap.mjs";
import AuthService from "../auth.service.js";

async function register(req, res, next) {
  const user = req.body;
  const { role, userId } = await AuthService.register(user);

  const result = { role, userId };
  res.locals = Object.assign({}, res.locals, { status: 201, result });
  return next();
}

export const registerHandler = wrap(register);