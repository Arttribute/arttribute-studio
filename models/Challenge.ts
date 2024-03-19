import mongoose from "mongoose";
import User from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface Challenge {
  challenge_name: string;
  challenge_uuid: string;
  slug: string;
  code: string;
  description: string;
  thumbnail: string;
  owner: object;
  start_date: Date;
  end_date: Date;
  announcement_date: Date;
  private: boolean;
  submissions: string[];
  perks: object[];
  rules: string;
  prize_description: string;
  winners: object[];
  is_publicvoting: boolean;
  is_judged: boolean;
  closed: boolean;
}

const ChallengeSchema = new mongoose.Schema<Challenge>(
  {
    challenge_name: {
      type: String,
      required: true,
    },
    challenge_uuid: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: User,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    announcement_date: {
      type: Date,
      required: true,
    },
    private: {
      type: Boolean,
      default: false,
    },
    submissions: {
      type: [String],
    },
    //Consider xp points for each participants
    perks: {
      type: [
        {
          prize_name: String,
          prize_description: String,
          prize_image: String,
        },
      ],
    },
    rules: {
      type: String,
    },
    prize_description: {
      type: String,
      required: true,
    },
    is_publicvoting: {
      type: Boolean,
      default: false,
    },
    is_judged: {
      type: Boolean,
      default: false,
    },
    winners: {
      type: [ObjectId],
      ref: "Submission",
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);

export default Challenge;
