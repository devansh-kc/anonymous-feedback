"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import ThemeConverter from "./ThemeConverter";
function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <nav className=" flex m-5  p-5  justify-between align-middle items-center ">
      <div className="container ">
        <a href="/" className={`text-xl font-bold mb-4 md:mb-0`}>
          True Feedback
        </a>
      </div>
      <div className="justify-center align-middle items-center flex ">
        {session ? (
          <>
            <span className="mr-4 max-sm:hidden">
              Welcome, {user.username || user.email}
            </span>
            <Button
              onClick={() => signOut()}
              className={`w-auto text-foreground bg-background hover:none`}
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto text-foreground bg-background" variant={"outline"}>
              Login
            </Button>
          </Link>
        )}
        <ThemeConverter className="mr-3 animate-accordion-down" />
      </div>
    </nav>
  );
}

export default Navbar;
