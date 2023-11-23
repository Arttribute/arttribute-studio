import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Community from "@/models/Community";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const id = params.id;

    const user = await User.findById(id);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
