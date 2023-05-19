import React from 'react'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { PostCardType } from './PostGrid'

function Post({ postItem }: {postItem: PostCardType}) {
  const { userInfo, post } = postItem
  const { image, title, price } = post 
 
  return (
    <div className='w-[250px] md:w-[300px] border-2 border-gray-200 rounded-xl flex flex-col'>
      <Image src={image} alt={title} width={200} height={400} className='w-full rounded-t-xl' />
      <div className='p-4 flex-grow flex flex-col justify-between'>
        <div className='flex justify-between gap-8  flex-grow'>
          <h3 className='font-bold text-lg md:text-xl mb-2 '>{title}</h3>
          <span className='text-lg font-light'>${price}</span>
        </div>        
        <p className='overflow-hidden'><span className='text-gray-500 font-light break-words max-w-full '>Sold by </span> {userInfo.firstName} {userInfo.lastName}</p>
        <div className='mt-2 flex justify-center flex-shrink'>
          <button className='px-8 py-2  text-2xl  border-2 border-gray-300 w-full border-r-0'><AiOutlineHeart /></button>
          <button className='px-8 py-2 text-2xl border-2 border-gray-300 w-full'><AiOutlineShoppingCart/ ></button>
        </div>
      </div>
    </div>
  )
}

export default Post