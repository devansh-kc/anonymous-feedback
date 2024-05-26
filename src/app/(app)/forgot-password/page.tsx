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
    console.log(data);
    const response = await axios.post("/api/forgot-pasword", data);
    if (response.data.success) {
      router.push(`/forgot-password/${data.email}`);
    } else {
      toast({
        title: "Error ",
        description: response.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link
            className="font-medium text-gray-900 hover:underline dark:text-gray-50"
            href="/sign-up"
          >
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
