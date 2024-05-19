import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest } from "next/server";
import { sendForgotPasswordEmail } from "@/helpers/forgotPasswordEmail";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Please enter a email",
        },
        { status: 400 }
      );
    }

    const ExistingUser = await UserModel.findOne({
      email,
    });
    console.log(ExistingUser);

    if (!ExistingUser) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }
    const username = ExistingUser.username;
    const verifyUserCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    ExistingUser.verifyCode = verifyUserCode;
    ExistingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
    await ExistingUser.save();
    const emailResponse = await sendForgotPasswordEmail(
      email,
      username,
      verifyUserCode
    );

    return Response.json(
      {
        success: true,
        message: "user found",
        ExistingUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error while  fetching the user",
      },
      {
        status: 500,
      }
    );
  }
}
