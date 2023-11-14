import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface Community extends mongoose.Document {
  name: String;
  members: any[];
  models: any[];
  display_image: String;
  slug: String;
}
// TODO: implement the community schema

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [ObjectId],
      required: false,
    },
    models: {
      type: [ObjectId],
      required: false,
    },
    display_image: {
      type: String,
      required: true,
    },
    slug: {
      type: [ObjectId],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const community =
  mongoose.models.community || mongoose.model("community", communitySchema);

export default community;
