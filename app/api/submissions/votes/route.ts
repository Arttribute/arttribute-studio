import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Submission from "@/models/Submission";
import SubmissionVote from "@/models/SubmissionVote";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const requestbody = await request.json();

    const submission = await Submission.findOne({
      _id: requestbody.submission_id,
    });
    if (!submission) {
      return new NextResponse("Submission does not exist", {
        status: 400,
      });
    }

    const userVote = await SubmissionVote.findOne({
      submission: requestbody.submission_id,
      user: requestbody.voter,
    });
    if (userVote) {
      return new NextResponse("User has already voted", {
        status: 400,
      });
    }

    const submissionVote = await SubmissionVote.create(requestbody);
    await Submission.findOneAndUpdate(
      { _id: requestbody.submission_id },
      { $inc: { votes: 1 } }
    ).exec();

    return new NextResponse(JSON.stringify(submissionVote), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
