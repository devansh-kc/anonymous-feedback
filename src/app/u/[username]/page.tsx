"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { messageSchema } from "@/schemas/message.schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { Axios } from "axios";
import { useToast } from "@/components/ui/use-toast";

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast()

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const watchContent = form.watch("content");

  const initialMessageString =
    "What's your favorite movie?||Do you have any pets?||What's your dream job?";
  const params = useParams<{ username: string }>();
  const InitialMessage = initialMessageString.split("||");
  async function onMessageSubmmit(data: z.infer<typeof messageSchema>) {
    const response = await axios.post("/api/send-message", {
      username: params.username,
      content: data.content,
    });
    if (response.data.success) {
      toast({
        title: "success",
        description: response.data.message,
      });
    } else {
      toast({
        title: "error",
        description: response.data.message,
        variant:"destructive"
      });
    }
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form
          className=" space-y-6"
          onSubmit={form.handleSubmit(onMessageSubmmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormLabel>
                  {" "}
                  Send Anonymous Message to @{params.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here "
                    className="resize-none "
                    {...field}
                  />
                </FormControl>
              </>
            )}
          ></FormField>
          <Button type="submit" disabled={!watchContent || isLoading}>
            {" "}
            Send it
          </Button>
        </form>
      </Form>
      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button className="my-4">Suggest Message </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader className="font-bold "> Messages</CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {InitialMessage.map((data, index) => (
              <Button
                className="bg-transparent border  text-black hover:bg-white"
                key={index}
              >
                {data}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}

export default page;
