import { defaultProfile } from "@/data/defaults";
import { generateName } from "@/lib/utils";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  web3Address: string;
  name: string;
  email: string;
  picture: string;
  credits: number;
  featured: boolean;
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
    picture: {
      type: String,
      default: defaultProfile,
    },
    credits: {
      type: Number,
      default: 100,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
