"use client";
import React, { useState } from "react";
import Link from "next/link";
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
import { Eye, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signIn.schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DemoUserButton from "@/components/DemoUser/Page";
import ThemeConverter from "@/components/ThemeConverter";
export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [passwordType, setPasswordType] = useState(true);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onHandleSignIn(data: z.infer<typeof signInSchema>) {
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (
      result?.error == "Error: Please verify your account first before login"
    ) {
      router.replace(`/verify/${data.identifier}`);
    }
    if (result?.error) {
      console.log(result);
      toast({
        title: "Sign in failed",
        description: result.error,
        variant: "destructive",
      });
    }
    if (result?.url) {
      router.replace("/dashboard");
    }
  }

  return (
    <div>
      <div className="flex flex-col  items-center justify-center h-screen shadow-xl    ">
        <div>
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your email and password below to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onHandleSignIn)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username || email</FormLabel>
                        <FormControl>
                          <Input
                            required
                            placeholder="write username or email .... "
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type={passwordType ? "password" : "text"}
                            placeholder="enter password .... "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex  justify-between items-center align-middle">
                    <p>
                      <Link
                        className="text-sm underline "
                        href={"/forgot-password"}
                      >
                        Forgot password
                      </Link>
                    </p>
                    <p
                      className="text-sm cursor-pointer"
                      onClick={() => setPasswordType((password) => !password)}
                    >
                      Show Password
                    </p>
                  </div>
                  <CardFooter className="flex flex-col ">
                    <Link
                      className="text-sm underline p-2 m-2 "
                      href="/sign-up"
                    >
                      Don&apos;t have an account? Sign up
                    </Link>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-3 h-4 w-4 animate-spin" />{" "}
                          Please wait
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>{" "}
                  </CardFooter>
                  <Separator />
                </form>
              </Form>
            </CardContent>{" "}
            <DemoUserButton />
          </Card>
        </div>
      </div>
    </div>
  );
}
