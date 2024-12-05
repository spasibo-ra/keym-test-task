import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";
import UserModel from "../user/user.model.js";

export const authHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
      ? req.header("Authorization").split("Bearer ")[1]
      : null;
    if (!token) throw new HttpError(401, "Authentication token missing");
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(token, secretKey);

    const user = await UserModel.findById(decoded.userId);
    if (!user) return next(new HttpError(401, "Wrong authentication token"));
    req.user = { userId: user._id, role: user.role };
    return next();
  } catch (err) {
    return next(err);
  }
};
