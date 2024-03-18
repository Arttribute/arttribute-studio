import mongoose from "mongoose";
import User from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface Submission {
  challenge_id: object;
  prompt_id: object;
  owner: object;
  title: string;
  votes: number;
  image_url: string;
  is_winner: boolean;
}

const SubmissionSchema = new mongoose.Schema<Submission>(
  {
    challenge_id: {
      type: ObjectId,
      ref: "Challenge",
      required: true,
    },
    prompt_id: {
      type: ObjectId,
      ref: "Prompt",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: User,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    image_url: {
      type: String,
      required: true,
    },
    is_winner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Submission =
  mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);

export default Submission;
