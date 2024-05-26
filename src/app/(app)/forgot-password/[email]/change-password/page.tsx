"use client";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { NextRequest } from "next/server";
import { EyeIcon } from "lucide-react";
interface passwordProp {
  password: string;
}
function page(request: NextRequest) {
  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<passwordProp>({
    defaultValues: {
      password: "",
    },
  });
  async function onChangePassword(data: passwordProp) {
    try {
      const response = await axios.patch("/api/change-password", {
        email: params.email,
        password: data.password,
      });
      if (response.status == 200) {
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast({
        title: "error",
        description: error,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onChangePassword)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="pr-10"
                      id="new-password"
                      placeholder="Enter new password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
