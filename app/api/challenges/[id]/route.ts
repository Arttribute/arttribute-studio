import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Challenge from "@/models/Challenge";
import Submission from "@/models/Submission";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const challenge = await Challenge.findOne({ slug }).populate("owner");
    const submissions = await Submission.find({
      challenge_id: challenge._id,
    })
      .populate("prompt_id")
      .populate("owner")
      .populate("tunedmodel_id")
      .sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify({ challenge, submissions }), {
      status: 200,
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
    const challenge = await Challenge.findOneAndUpdate(
      { _id: requestbody._id },
      requestbody
    );

    return new NextResponse(JSON.stringify(challenge), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
