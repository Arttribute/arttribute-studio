import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface Prompt {
  prompt_id: string;
  text: string;
  negative_prompt: string;
  images: string[];
  owner: object;
  tunedmodel_id: object;
  status: string;
}

const PromptSchema = new mongoose.Schema<Prompt>(
  {
    prompt_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    negative_prompt: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    owner: {
      type: String, //type: ObjectId,
      required: true, //ref: "User",
    },
    tunedmodel_id: {
      type: ObjectId,
      ref: "TunedModel",
    },
    status: {
      type: String,
      default: "queued",
    },
  },
  { timestamps: true }
);

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
