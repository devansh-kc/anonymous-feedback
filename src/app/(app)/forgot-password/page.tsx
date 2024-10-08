"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { checkEmailForForgotPassword } from "@/schemas/checkEmailForForgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";

function Page() {
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
    try {
      const response = await axios.post<ApiResponse>("/api/forgot-password", {
        email: data.email,
      });

      if (!response.data.success) {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
      router.push(`/forgot-password/${data.email}`);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error ",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="grid rounded-lg  my-auto  items-center p-5   ">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight ">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(OnHandleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="please enter your email"
                      type="email"
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm  ">
          <Link className="font-normal " href="/sign-up">
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
