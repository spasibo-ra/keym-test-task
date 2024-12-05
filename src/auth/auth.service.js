import jwt from "jsonwebtoken";
import UserModel from "../user/user.model.js";
import { HttpError } from "../utils/httpError.js";
import { verifyPassword, hash } from "../utils/hash.js";

class AuthService {
  static async login(params) {
    const { login, password } = params;
    const user = await UserModel.findOne({ login });
    if (!user) throw new HttpError(401, `This login: ${login} was not found`);
    
    const isVerifyed = await verifyPassword(password, user.password);
    if (!isVerifyed) throw new HttpError(401, "Wrong password");

    const token = this.createToken(user);
    return token;
  }

  static async register(params) {
    const { login, password, email } = params;
    const isExist = await UserModel.findOne({ login });
    if (isExist) throw new HttpError(400, `This login: ${login} already exist`);
    const hashedPassword = await hash(password);
    const user = await UserModel.create({
      login,
      password: hashedPassword,
      email,
    });
    return { userId: user._id, role: user.role };
  }

  static createToken(user) {
    const { _id: userId, role } = user;
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = 60 * 60 * 2;
    const token = jwt.sign({ userId, role }, secretKey, { expiresIn });
    return token;
  }
}

export default AuthService;