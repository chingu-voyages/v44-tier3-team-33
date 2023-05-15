import Link from "next/link"
import { RxAvatar } from "react-icons/rx"
import { BsCart3 } from "react-icons/bs"

function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md">
      <Link href="" className="font-bold text-xl">Logo</Link>
      <nav className="flex gap-4">
        <Link className="hover:opacity-60 focus:opacity:60" href="">Discover</Link>
        <Link className="hover:opacity-60 focus:opacity:60" href="">Category</Link>
        <Link className="hover:opacity-60 focus:opacity:60" href="">Saved</Link>
      </nav>
      <input 
        type="search" 
        placeholder="Search for a book"
        className="p-2 border-2 border-gray-300 rounded-lg"
      />
      <Link href=""><RxAvatar className="text-4xl" /></Link>
      <Link href=""><BsCart3 className="text-3xl"/></Link>
    </header>
  )
}

export default Navbar