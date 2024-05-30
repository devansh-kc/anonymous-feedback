"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon, X } from "lucide-react";
import { Message } from "@/models/Messages.model";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/apiResponse";
type messageCardProp = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};
function MessageCard({ message, onMessageDelete }: messageCardProp) {
  const { toast } = useToast();
  async function onDeleteMessage() {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
      variant: "default",
    });
    onMessageDelete(message._id);
  }
  return (
    <div>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between">
              <p className="text-gray-800">{message.content}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="text-gray-500 hover:text-red-500"
                    size="icon"
                    variant="ghost"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Delete message</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteMessage}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </main>
    </div>
    //   <Card className="flex flex-col h-screen">
    //     <CardHeader className="flex-1 overflow-y-auto p-6">
    //       <CardTitle className="text-gray-800">{message.content}</CardTitle>

    //       <CardDescription>Card Description</CardDescription>
    //     </CardHeader>
    //   </Card>
  );
}

export default MessageCard;
