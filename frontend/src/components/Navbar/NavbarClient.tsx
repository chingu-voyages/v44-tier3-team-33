"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

function NavbarClient({ userId }: { userId: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNav() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  return (
    <>
      <nav
        className={`flex  gap-4 ${
          isOpen
            ? "fixed left-0 top-[60px] w-full flex-col bg-white p-4 xs:z-20 xs:shadow-lg"
            : "hidden items-center justify-end md:inline-flex md:w-[65%]"
        }`}
      >
        {/* <div> */}

          <Link className="xs:ml-4 hover:opacity-60 focus:opacity:60  md:pr-2" href="/">Discover</Link>
          <Link className="xs:ml-4 hover:opacity-60 focus:opacity:60 md:ml-0 md:pr-2" href="">Category</Link>

        {/* </div> */}

        {userId ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Link
              className="focus:opacity:60 hover:opacity-60 xs:ml-4 md:ml-0"
              href=""
            >
              Saved
            </Link>
            <Link href="">
              <RxAvatar className="text-4xl xs:ml-4" />
            </Link>
            <Link href="">
              <BsCart3 className="text-3xl xs:ml-4" />
            </Link>
            <button className="focus:opacity:60 text-left hover:opacity-60 xs:ml-4 md:pr-4">
              <UserButton />
            </button>
          </div>
        ) : (
          <button className="focus:opacity:60 text-left hover:opacity-60 xs:ml-4  md:pr-4">
            <SignInButton />
          </button>
        )}
      </nav>
      <button onClick={toggleNav} className="md:hidden">
        <RxHamburgerMenu />
      </button>
    </>
  );
}

export default NavbarClient;
