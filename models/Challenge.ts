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
  submissions: object[];
  perks: object[];
  prize_description: string;
  is_publicvoting: boolean;
  is_judged: boolean;
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
      type: [
        {
          itemId: ObjectId,
          submission_date: Date,
          votes: Number,
          is_winner: Boolean,
        },
      ],
      ref: "Prompt",
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
  },
  { timestamps: true }
);

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);

export default Challenge;
