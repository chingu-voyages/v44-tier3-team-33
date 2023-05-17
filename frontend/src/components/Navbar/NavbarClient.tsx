"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { CiSearch } from "react-icons/ci"

import { RxHamburgerMenu } from "react-icons/rx"


function NavbarClient({ userId}: {userId: string | null}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchBar, setSearchBar] = useState(false)

  function toggleNav(){
    setIsOpen(prevOpen => !prevOpen)
  }
  function toggleSearch(){
    setSearchBar(prevSearchBar => !prevSearchBar)
  }

  return (
    <>
      <nav className={`flex  gap-4 ${isOpen ? "flex-col fixed left-0 top-[60px] xs:z-20 bg-white xs:shadow-lg p-4 w-full" : "hidden md:block md:flex-row md:w-auto "}`}>
        <Link className="hover:opacity-60 focus:opacity:60  md:pr-4" href="">Discover</Link>
        <Link className="hover:opacity-60 focus:opacity:60 md:pr-4" href="">Category</Link>
        {userId && <Link className="hover:opacity-60 focus:opacity:60" href="">Saved</Link>}
      </nav> 
      <button onClick={toggleNav} className='md:hidden'>
        <RxHamburgerMenu />
      </button>
      <input 
        type="search" 
        placeholder="Search for a book"
        className={`${searchBar ? "xs:fixed xs:top-[70px]" : "hidden md:block"} p-2 border-2 border-gray-300 rounded-lg`}
      />
      <button onClick={toggleSearch} className='md:hidden'>
        <CiSearch />
      </button>
       
    </>
  )
}

export default NavbarClient