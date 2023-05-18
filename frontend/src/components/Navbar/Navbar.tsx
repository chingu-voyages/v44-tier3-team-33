import Link from "next/link"
import { auth } from "@clerk/nextjs"
import NavbarClient from "./NavbarClient"

function Navbar() {  
  const { userId } = auth()

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md relative text-black">
      <Link href="" className="font-bold text-xl">Logo</Link>
      <input 
        type="search" 
        placeholder="Search for a book"
        className="absolute top-[60px] xs:pl-8 md:pl-4 left-0 w-full md:static  p-2 border-2 xs:border-x-0 md:border-x-2 border-gray-300 md:rounded-lg w- md:w-48"
      />
      <NavbarClient userId={userId} />
    </header>
  )
}

export default Navbar