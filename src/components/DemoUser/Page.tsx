import React from "react";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
function DemoUserButton() {
  const { toast } = useToast();
  const router = useRouter();
  async function onDemoHandler() {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: process.env.NEXT_PUBLIC_DEMO_USER_NAME,
      password: process.env.NEXT_PUBLIC_PASSSWORD,
    });
    if (result?.error) {
      toast({
        title: "Sign in failed",
        description: result.error,
        variant: "destructive",
      });
    }
    if (result) {
      router.replace("/dashboard");
    }
  }
  return (
    <CardContent className="space-y-4 flex flex-col items-center">
      <p className=" text-center">Sign in as a Demo user </p>
      <Button
        className="align-middle justify-around items-center mx-auto"
        onClick={onDemoHandler}
      >
        Click here to sign in as a demo user
      </Button>
    </CardContent>
  );
}

export default DemoUserButton;
