import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Challenge from "@/models/Challenge";

export async function GET() {
  try {
    await dbConnect();
    const challenges = await Challenge.find()
      .sort({ createdAt: -1 })
      .populate("owner");

    return new NextResponse(JSON.stringify(challenges), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const requestbody = await request.json();
    const challenge = await Challenge.create(requestbody);

    return new NextResponse(JSON.stringify(challenge), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
