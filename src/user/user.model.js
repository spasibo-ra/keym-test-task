import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  role: { type: String, enum: ['user','owner', 'admin'], default: 'user' }
}, { versionKey: false });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;