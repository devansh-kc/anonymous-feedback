import { Resend } from "resend";
import { ApiResponse } from "@/types/apiResponse";
import { resend } from "@/lib/resend";
import forgotPasswordEmail from "../../emails/forgotPasswordEmails";

export async function sendForgotPasswordEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification code ",
      react: forgotPasswordEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email sent Successfully " };
  } catch (emailError) {
    console.log("Error sending while verification email ", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
