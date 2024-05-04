import { Message } from "@/models/Messages.model";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
}
