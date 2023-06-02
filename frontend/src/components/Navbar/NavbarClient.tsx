"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { userId } = useAuth();
  const router = useRouter()

  function toggleNav() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search/${searchQuery}`)
    setSearchQuery("")
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full  items-center justify-between px-8 py-4 ">
        <div className="md:hidden">
          <NavLink href="">
            <span className=" font-bold">Logo</span>
          </NavLink>
        </div>
        <div
          className={`flex  gap-4 ${
            isOpen
              ? "fixed left-0 top-[60px] z-50  h-screen w-full flex-col  bg-black/70 text-lg backdrop-blur-sm xs:shadow-lg"
              : "hidden items-center justify-end md:flex md:w-full "
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className=" flex w-full flex-col items-center justify-center gap-5 bg-white p-4 md:flex-row md:justify-between"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
              <NavLink href="" className=" hidden md:flex">
                <span className=" font-bold">Logo</span>
              </NavLink>
              <NavLink href="/">Discover</NavLink>
              <NavLink href="">Category</NavLink>
              {userId ? (
                <>
                  <NavLink href="">Saved</NavLink>
                  <NavLink href="/post">Sell Now</NavLink>
                </>
              ) : (
                ""
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                onChange={(event) => setSearchQuery(event.target.value)}
                value={searchQuery}
                placeholder="Search for a book"
                className=" hidden  w-full border-2 border-gray-300 p-2  xs:border-x-0 xs:pl-8 md:static md:flex md:w-48 md:rounded-lg md:border-x-2 md:pl-4 lg:w-80"
              />
            </form>
            {userId ? (
              <div className="flex  w-full justify-between gap-5 px-5  md:w-fit md:items-center md:justify-center">
                <NavLink href="/cart">
                  <BsCart3 className="text-3xl " size={30} />
                </NavLink>
                <button className="focus:opacity:60 text-left hover:opacity-60  md:pr-4">
                  <UserButton />
                </button>
              </div>
            ) : (
              <button className="focus:opacity:60 text-left hover:opacity-60 xs:ml-4  md:pr-4">
                <SignInButton />
              </button>
            )}
          </div>
        </div>
        <button onClick={toggleNav} className="md:hidden">
          <RxHamburgerMenu />
        </button>
      </div>

      {isOpen ? <div className=""></div> : ""}
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          placeholder="Search for a book"
          className=" flex  w-full border-2 border-gray-300 p-2  xs:border-x-0 xs:pl-8 md:static md:hidden md:w-48 md:rounded-lg md:border-x-2 md:pl-4 lg:w-80"
        /> 
      </form>
    </div>
  );
}

export default NavbarClient;

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={`focus:opacity:60 flex items-center  justify-center hover:opacity-60  md:pr-2 ${className}`}
    >
      {children}
    </Link>
  );
};
