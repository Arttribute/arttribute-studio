import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

interface Fields {
  name: string;
  email: string;
  bio: string;
  tags: string[];
  fileUrl: string | null;
}

export async function GET(request: Request, { params }: { params: Params }) {
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

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { name, email, fileUrl }: Fields = await request.json();

    const user = await User.findOneAndUpdate(
      { web3Address: params.slug },
      {
        name,
        email,
        picture: fileUrl,
      },
      { new: true }
    );

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { name, email, bio, tags, fileUrl }: Fields = await request.json();

    const user = await User.findOneAndUpdate(
      { web3Address: params.slug },
      {
        name,
        email,
        description: bio,
        tags,
        picture: fileUrl,
      },
      { new: true }
    );

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
