"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { verifySchema } from "@/schemas/verify.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";

function Page() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  async function OnHandleSubmit(data: z.infer<typeof verifySchema>) {
    try {
      const response = await axios.post("/api/forgot-password-verify-code", {
        email: params.email,
        code: data.code,
      });
      if (response.data.status ) {
        router.push(`/forgot-password/${params.email}/change-password`);
      } else {
        console.log(response)
        toast({
          title: "error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 dark">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Verify your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(OnHandleSubmit)}
          >
            <div className="justify-center">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Didn&lsquo;t receive the code?
          <Link
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            href="#"
          >
            Resend
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
