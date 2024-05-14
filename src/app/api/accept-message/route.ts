import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

import { User } from "next-auth";

export async function POST(request: Request) {
  dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptMessage: acceptMessages,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user to accept  message ",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "message acceptence status updated successfully  ",
          updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "failed to update message status ",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  console.log(user);

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const foundUser = await UserModel.findById(user._id);
  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          success: true,
          isAcceptingMessages: foundUser.isAcceptMessage,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error, "error from accept  message");
    return Response.json(
      {
        success: true,
        message: error,
      },
      { status: 500 }
    );
  }

  //   const { acceptMessages } = await request.json();
}
