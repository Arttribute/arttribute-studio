import mongoose from "mongoose";
import { boolean } from "zod";
const { ObjectId } = mongoose.Schema.Types;

const User = require("./User");
const TunedModel = require("./TunedModel");

export interface Community extends mongoose.Document {
  name: String;
  description: String;
  admin: string[];
  members: string[];
  requested: string[];
  models: any[];
  visibility: String;
  display_image: String;
  banner_image: String;
  slug: String;
  community_uuid: String;
  approved: Boolean;
}
// TODO: implement the community schema

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    admins: {
      ref: "User",
      type: [ObjectId],
      required: false,
    },
    members: {
      ref: "User",
      type: [ObjectId],
      required: false,
    },
    requested: {
      ref: "User",
      type: [ObjectId],
      required: false,
    },
    models: {
      ref: "TunedModel",
      type: [ObjectId],
      required: false,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      required: true,
    },
    display_image: {
      type: String,
      required: true,
    },
    banner_image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    community_uuid: {
      type: String,
      required: true,
      unique: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default community;
