import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

type Fields = {
  web3Address: string;
  //   name: string;
  //   email: string;
  //   avatar: string;
};

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), {
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
    const { web3Address }: Fields = await request.json();

    const existingUser = await User.findOne({ web3Address });
    if (existingUser) {
      //   return new NextResponse("User Already Exists", {
      //     status: 409,
      //   });
      return new NextResponse(JSON.stringify(existingUser), {
        status: 200,
      });
    }

    const user = await User.create({
      web3Address,
    });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
