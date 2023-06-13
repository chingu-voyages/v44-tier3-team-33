import { auth } from "@clerk/nextjs";
import Link from "next/link";

import NavbarClient from "./NavbarClient";

const Navbar = () => {
  const { userId } = auth();

  return (
    <header className="sticky top-0 z-50 flex flex-col items-center justify-center border  bg-white text-black shadow-md ">
      <nav className="flex w-full items-center justify-between  ">
        <NavbarClient />
      </nav>
    </header>
  );
};

export default Navbar;
