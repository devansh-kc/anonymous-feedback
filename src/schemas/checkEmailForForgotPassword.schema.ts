import { z } from "zod";

export const checkEmailForForgotPassword = z.object({
  email: z.string().email("this email is not valid"),
});
