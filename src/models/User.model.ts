import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./Messages.model";
import { MessageSchema } from "./Messages.model";
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptMessage: boolean;
  messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email  is required"],
    trim: true,
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "password  is required"],
    trim: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password should contain a one Capital letter , one number and one special character",
    ],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code   is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify Code Expiry  is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
