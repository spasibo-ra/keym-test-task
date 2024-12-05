import wrap from "../../utils/wrap.mjs";
import AuthService from "../auth.service.js";

async function login(req, res, next) {
  const user = req.body;
  const accessToken = await AuthService.login(user);
  res.locals = Object.assign({}, res.locals, {
    status: 200,
    result: { accessToken },
  });
  return next();
}

export const loginHandler = wrap(login);
