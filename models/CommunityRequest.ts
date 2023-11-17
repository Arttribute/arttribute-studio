import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface CommunityRequest extends mongoose.Document {
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

const communityRequestSchema = new mongoose.Schema(
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

const communityRequest =
  mongoose.models.community_requests ||
  mongoose.model("communityRequest", communityRequestSchema);

export default communityRequest;
