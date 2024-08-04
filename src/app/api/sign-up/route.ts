import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUserName) {
      return Response.json(
        { success: false, message: "Username is already Taken" },
        { status: 400 }
      );
    }
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
    });
    const verifyUserCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
          { success: false, message: "The user already exists" },
          { status: 500 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hashedPassword;
        existingUserVerifiedByEmail.verifyCode = verifyUserCode;
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000
        );
        await existingUserVerifiedByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyUserCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyUserCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "User registered successfully . Please verify your email",
          emailResponse
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("error regersting user ", error);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
