import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUp.schema";

const UserNameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UserNameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(", ")
              : "Invalid query Parameter",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existingVerifiedUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUserName) {
      return Response.json(
        {
          success: false,
          message: "This username already exists",
        },
        { status: 409 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
