"use client";
import * as z from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
function page() {
  const [username, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUserName = useDebounce(userNameMessage, 3000);
  const { toast } = useToast();
  const router = useRouter();
  // zod immplementation
  
  return <div> </div>;
}

export default page;
