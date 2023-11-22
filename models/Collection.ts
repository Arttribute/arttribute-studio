import mongoose from "mongoose";
import User from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface Collection {
  collection_name: string;
  description: string;
  images: string[];
  owner: object;
  license: string;
  featured: boolean;
  slug: string;
  collection_uuid: string;
}

const CollectionSchema = new mongoose.Schema<Collection>(
  {
    collection_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: User,
    },
    license: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    collection_uuid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);

export default Collection;
