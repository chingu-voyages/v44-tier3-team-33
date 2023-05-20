import { auth } from "@clerk/nextjs";
import Link from "next/link";

import NavbarClient from "./NavbarClient";

function Navbar() {
  const { userId } = auth();

  return (
    <header className="relative flex items-center justify-between px-8 py-4 text-black shadow-md">
      <Link href="" className="text-xl font-bold md:mr-4">
        Logo
      </Link>
      <input
        type="search"
        placeholder="Search for a book"
        className="absolute left-0 top-[60px] w-full border-2 border-gray-300 p-2  xs:border-x-0 xs:pl-8 md:static md:w-48 md:rounded-lg md:border-x-2 md:pl-4 lg:w-80"
      />
      <NavbarClient userId={userId} />
    </header>
  );
}

export default Navbar;
