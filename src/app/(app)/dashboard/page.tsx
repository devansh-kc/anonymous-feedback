"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/Messages.model";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessage.schema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw, LoaderPinwheelIcon } from "lucide-react";
import MessageCard from "@/components/MessageCard";
function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [hostName, setHostName] = useState("");
  function handleDeleteMessage(messageId: string) {
    setMessages(messages.filter((message) => message._id !== messageId));
  }
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessage = watch("acceptMessage");
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-message`);
      setValue("acceptMessage", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting ",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);
  const fetchMessage = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-message");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing Latest Messages ",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message setting ",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessage();
    fetchAcceptMessage();
  }, [fetchAcceptMessage, fetchMessage]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-message", {
        acceptMessages: !acceptMessage,
      });
      setValue("acceptMessage", !acceptMessage);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting ",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (process) {
      setHostName(window.location.host);
    }
  }, []);
  const username = session?.user.username;
  const profileUrl = `${hostName}/u/${username}`;

  if (!session || !session?.user) {
    return (
      <div className="flex h-screen  items-center justify-center ">
        <div className="flex flex-col items-center space-y-4">
          <LoaderPinwheelIcon className="h-12 w-12 animate-spin" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Text Copied",
      variant: "default",
    });
  }
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl ">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 rounded-md"
          />
          <Button onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessage")}
          checked={acceptMessage}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessage ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4 "
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessage(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          
        ) : (
          <RefreshCcw className="h-4 w-4 text-white" />
        )}
      </Button>
      <div className="flex flex-col h-screen">
        {messages.length !== 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
