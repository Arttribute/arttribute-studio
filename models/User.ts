import { defaultProfile } from "@/data/defaults";
import { generateName } from "@/lib/utils";
import { Collection } from "./Collection";
import { Community } from "./Community";
import { TunedModel } from "./TunedModel";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  web3Address: string;
  name: string;
  description: string;
  tags: string[];
  email: string;
  picture: string;
  followers: User[];
  following: User[];
  communities: Community[];
  models: TunedModel[];
  collections: Collection[];
  works: string[];
  createdAt: Date;
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
    tags: {
      type: [String],
      default: [],
    },
    picture: {
      type: String,
      default: defaultProfile,
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    credits: {
      type: Number,
      default: 100,
    },
    description: {
      type: String,
      default: null,
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
