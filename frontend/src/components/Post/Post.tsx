import React from 'react'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"

const dummyPost = {
  createdBy: "Seller",
  image: "/dummyImg.jpg",
  price: 10,
  title: "Harry Potter and the Order of Phoenix."

}

function Post() {
  const { createdBy, image, price, title } = dummyPost
 
  return (
    <div className='w-[250px] md:w-[300px] border-2 border-gray-200 rounded-xl'>
      <Image src={image} alt={title} width={200} height={400} className='w-full rounded-t-xl' />
      <div className='p-4'>
        <h3 className='font-bold text-lg md:text-xl mb-2 flex gap-8'>{title} <span className='text-lg font-light'>${price}</span></h3>
        <p><span className='text-gray-500 font-light'>Sold by </span> {createdBy}</p>
        <div className='mt-2 flex justify-center'>
          <button className='px-8 py-2  text-2xl  border-2 border-gray-300 w-full border-r-0'><AiOutlineHeart /></button>
          <button className='px-8 py-2 text-2xl border-2 border-gray-300 w-full'><AiOutlineShoppingCart/ ></button>
        </div>
      </div>
    </div>
  )
}

export default Post