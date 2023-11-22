import dbConnect from "@/lib/dbConnect";
import Community from "@/models/Community";
import User from "@/models/User";
// import CommunityRequest from "@/models/CommunityRequest";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

type Params = {
  slug: string;
  id: string;
};

interface Fields {
  action: "join" | "leave";
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const slug = params.slug;
    const user_id = params.id;

    const community = await Community.findOne({ slug: slug })
      .populate(["models"])
      .exec();

    const { ObjectId } = mongoose.Schema.Types;
    const user = await User.findById(new mongoose.Types.ObjectId(user_id));
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { action }: Fields = await request.json();
    const slug = params.slug;
    const user_id = params.id;

    const community = await Community.findOne({ slug: slug });

    if (action == "join") {
      if (community.members.includes(user_id)) {
        return new NextResponse(JSON.stringify(community), {
          status: 200,
        });
      } else {
        if (community.visibility == "private") {
          if (community?.requested?.includes(user_id)) {
            return new NextResponse(JSON.stringify(community), {
              status: 200,
            });
          } else {
            community?.requested?.push(user_id);
            return new NextResponse(JSON.stringify(community.requested), {
              status: 200,
            });
          }
        } else {
          //TODO: Add community to user
          community?.members.push(user_id);
        }
      }
    } else if (action == "leave") {
      if (!community.members.includes(user_id)) {
        return new NextResponse(JSON.stringify(community), {
          status: 200,
        });
      } else {
        if (community.visibility == "private") {
          if (!community?.requested.includes(user_id)) {
            return new NextResponse(JSON.stringify(community), {
              status: 200,
            });
          } else {
            community.requested = community.requested.filter(
              (user: any) => user != user_id
            );
          }
        } else {
          community.members = community.members.filter(
            (user: any) => user != user_id
          );
          //TODO: Remove community from user
        }
      }
    }
    await community.save();

    return new NextResponse(JSON.stringify(community), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
