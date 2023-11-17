import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Community from "@/models/Community";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";

type Params = {
  slug: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const slug = params.slug;

    const community = await Community.findOne({ slug: slug })
      .populate(["members", "models"])
      .exec();

    return new NextResponse(JSON.stringify(community), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
