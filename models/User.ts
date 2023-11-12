import mongoose from "mongoose";

export interface User extends mongoose.Document {
  web3Address: string;
  //   name: string;
  //   email: string;
  //   avatar: string;
  createdAt: Date;
}
// TODO: implement the User schema

const userSchema = new mongoose.Schema(
  {
    web3Address: {
      type: String,
      required: true,
      unique: true,
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   unique: true,
    // },
    // avatar: {
    //   type: String,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
