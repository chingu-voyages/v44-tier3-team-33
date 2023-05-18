"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

import { RxHamburgerMenu, RxAvatar } from "react-icons/rx"
import { BsCart3 } from "react-icons/bs"


function NavbarClient({ userId}: {userId: string | null}) {
  const [isOpen, setIsOpen] = useState(false)
  
  function toggleNav(){
    setIsOpen(prevOpen => !prevOpen)
  }
  
  return (
    <>
      <nav className={`flex  gap-4 ${isOpen ? "flex-col fixed left-0 top-[60px] xs:z-20 bg-white xs:shadow-lg p-4 w-full" : "hidden md:inline-flex md:w-[65%] justify-end items-center"}`}>
        {/* <div> */}
          <Link className="xs:ml-4 hover:opacity-60 focus:opacity:60  md:pr-2" href="">Discover</Link>
          <Link className="xs:ml-4 hover:opacity-60 focus:opacity:60 md:ml-0 md:pr-2" href="">Category</Link>
        {/* </div> */}
        
        {userId ?
          <div className='flex flex-col md:flex-row gap-4 md:items-center'>
            <Link className="xs:ml-4 md:ml-0 hover:opacity-60 focus:opacity:60" href="">Saved</Link>
            <Link href=""><RxAvatar className="text-4xl xs:ml-4" /></Link>
            <Link href=""><BsCart3 className="text-3xl xs:ml-4"/></Link>
            <button className="xs:ml-4 hover:opacity-60 focus:opacity:60 text-left md:pr-4"><UserButton /></button>
          </div> : 
            <button className="xs:ml-4 hover:opacity-60 focus:opacity:60 text-left  md:pr-4"><SignInButton  /></button>          
        }
      </nav> 
      <button onClick={toggleNav} className='md:hidden'>
        <RxHamburgerMenu />
      </button>        
    </>
  )
}

export default NavbarClient