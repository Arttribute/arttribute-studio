import mongoose from "mongoose";
import User from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface SubmissionVote {
  submission_id: object;
  voter: object;
}

const SubmissionVoteSchema = new mongoose.Schema<SubmissionVote>(
  {
    submission_id: {
      type: ObjectId,
      ref: "Submission",
      required: true,
    },
    voter: {
      type: ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

const SubmissionVote =
  mongoose.models.SubmissionVote ||
  mongoose.model("SubmissionVote", SubmissionVoteSchema);
export default SubmissionVote;
