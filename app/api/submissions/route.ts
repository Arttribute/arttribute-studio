import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Challenge from "@/models/Challenge";
import Submission from "@/models/Submission";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const requestbody = await request.json();
    console.log(requestbody);
    const challengeCode = requestbody.challenge_code;
    console.log(challengeCode);
    const challenge = await Challenge.findOne({ code: challengeCode });
    console.log(challenge);

    const submissionData = {
      challenge_id: challenge._id,
      prompt_id: requestbody.prompt_id,
      tunedmodel_id: requestbody.tunedmodel_id,
      owner: requestbody.owner,
      title: requestbody.title,
      image_url: requestbody.image_url,
    };

    const submission = await Submission.create(submissionData);

    return new NextResponse(JSON.stringify({ submission, challenge }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const requestbody = await request.json();
    const submissionsToUpdate = requestbody.submissions;

    const updatedSubmissions = await Promise.all(
      submissionsToUpdate.map(async (submission: any) => {
        return await Submission.findOneAndUpdate(
          { _id: submission._id },
          { is_winner: submission.is_winner }
        );
      })
    );
    //TODO: the returned json is not the updated submission
    return new NextResponse(JSON.stringify(updatedSubmissions), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
