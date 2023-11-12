import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface Collection {
  collection_name: string;
  description: string;
  images: string[];
  owner: object;
  license: string;
  slug: string;
}

const CollectionSchema = new mongoose.Schema<Collection>(
  {
    owner: {
      type: String, //type: ObjectId,
      required: true, //ref: "User",
    },
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
    license: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);

export default Collection;
