import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

export async function GET({ params }: { params: Params }) {
  try {
    await dbConnect();
    const user = await User.findOne({ web3Address: params.slug });
    if (!user) {
      return new NextResponse("User Not Found", {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
