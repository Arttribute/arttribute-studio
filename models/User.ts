import { generateName } from "@/lib/utils";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  web3Address: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    web3Address: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    name: {
      type: String,
      default: generateName(),
    },
    avatar: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
