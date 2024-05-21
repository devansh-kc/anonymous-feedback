"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
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

function page() {
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
      if ((response.status = 200)) {
        router.push(`/forgot-password/${params.email}/change-password`);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
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
                    <FormLabel>code</FormLabel>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
