import { defaultProfile } from "@/data/defaults";
import { generateName } from "@/lib/utils";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  web3Address: string;
  name: string;
  description: string;
  tags: string[];
  email: string;
  picture: string;
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
    description: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      default: generateName(),
    },
    picture: {
      type: String,
      default: defaultProfile,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
