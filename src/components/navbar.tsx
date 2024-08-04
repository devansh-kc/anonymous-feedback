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
    <nav className="p-4 md:p-6 dark">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a
          href="#"
          className={`text-xl font-bold mb-4 md:mb-0`}
        >
          True Feedback
        </a>
        <div className="justify-center align-middle items-center flex ">
          {session ? (
            <>
              <span className="mr-4">
                Welcome, {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                className={`w-full md:w-auto text-white`}
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="w-full md:w-auto text-white"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
