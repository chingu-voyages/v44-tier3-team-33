import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { PostType } from '@/types/post.types';
import { UserType } from '@/types/user.types';
import { HiDocumentAdd } from "react-icons/hi"
import Post from "./post/Post"

type ProfileProps = {
  profile : {
    firstName : string,
    lastName: string,
    profileImageUrl: string,
  },
  availablePosts: { post:PostType, userInfo: UserType}[],
  soldPosts: { post:PostType, userInfo: UserType}[],
  userId?: string | null
}

function Profile({ profile, availablePosts, soldPosts, userId}: ProfileProps) {
  const { firstName, lastName, profileImageUrl } = profile
  
  return (
    <div className='mx-auto text-center md:mt-8'>
      <div className='mb-4'>
        <Image src={profileImageUrl} className='rounded-full mx-auto' alt="avatar" width={250} height={250} />
      </div>
      <h1 className='text-3xl font-bold text-center'>{firstName} {lastName}</h1>
      <div>
        <h2 className="text-xl  font-semibold mt-8">Available posts</h2>
        <div className='flex flex-nowrap overflow-x-scroll gap-8 p-8 justify-center'>
          {userId && <Link href="/post" className="w-full h-full"><HiDocumentAdd size={280}  /></Link>}
          {availablePosts?.map((postItem) => <Post key={postItem.post._id} postItem={postItem} />)}
        </div>
      </div>
      {soldPosts.length > 0 && <div>
        <h2 className="text-xl  font-semibold mt-8">Sold posts</h2>
        <div className='flex flex-nowrap overflow-x-scroll gap-8 p-8 justify-center'>
          {soldPosts.map((postItem) => <Post key={postItem.post._id} postItem={postItem} />)}
        </div>
      </div>}
    </div>
  )
}

export default Profile