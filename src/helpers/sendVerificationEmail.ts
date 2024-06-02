import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmails";
import { ApiResponse } from "@/types/apiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const data = await resend.emails.send({
      from: "Acme <noreply@resend.dev>",
      to: email,
      subject: "Verification code ",
      react: VerificationEmail({ username,otp:verifyCode}),
    })
    return { success: true, message: "verification email sent Successfully " };
  } catch (emailError) {
    return { success: false, message: "Failed to send verification email" };
  }
}
