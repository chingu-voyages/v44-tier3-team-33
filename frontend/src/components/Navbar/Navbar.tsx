import Link from "next/link"
import { RxAvatar } from "react-icons/rx"
import { BsCart3 } from "react-icons/bs"
import { SignInButton, auth } from "@clerk/nextjs"
import NavbarClient from "./NavbarClient"

function Navbar() {  
  const { userId } = auth()

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md">
      <Link href="" className="font-bold text-xl">Logo</Link>
      <NavbarClient userId={userId} />
      {userId ?
        <>
          <Link href=""><RxAvatar className="text-4xl" /></Link>
          <Link href=""><BsCart3 className="text-3xl"/></Link>
        </> : 
        <SignInButton />
      }
    </header>
  )
}

export default Navbar