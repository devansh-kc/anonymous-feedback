import { z } from "zod";
export const acceptMessageSchema = z.object({
  isAcceptingMessage: z.boolean(),
});
