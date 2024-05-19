"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { checkEmailForForgotPassword } from "@/schemas/checkEmailForForgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function page() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof checkEmailForForgotPassword>>({
    resolver: zodResolver(checkEmailForForgotPassword),
    defaultValues: {
      email: "",
    },
  });
  async function OnHandleSubmit(
    data: z.infer<typeof checkEmailForForgotPassword>
  ) {
    const response = await axios.post("/api/forgot-pasword", data);
    if (response.status == 200) {
      router.push(`/forgot-password/${data.email}`);
    } else {
      toast({
        title: "email is incorrect ",
        description: response.data,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(OnHandleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="please enter your email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
