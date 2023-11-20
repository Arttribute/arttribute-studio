import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const User = require("./User");
const TunedModel = require("./TunedModel");

export interface Community extends mongoose.Document {
  name: String;
  description: String;
  members: any[];
  models: any[];
  display_image: String;
  banner_image: String;
  slug: String;
  community_uuid: String;
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
    members: {
      ref: "User",
      type: [ObjectId],
      required: false,
    },
    models: {
      ref: "TunedModel",
      type: [ObjectId],
      required: false,
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
  },
  { timestamps: true }
);

const community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default community;
