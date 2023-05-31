import React from 'react'
import Image from "next/image"
import { getAvilablePostsByUserId, getSoldPostsByUserId, getUserProfile } from '@/utils/utils'
import Post from '@/components/post/Post'
import { PostType } from '@/types/post.types'
import { UserType } from '@/types/user.types'

type ParamsProps = {
  params : {
    id: string
  }
}
async function SellerProfile({ params} : ParamsProps) {
  const profilePromise = getUserProfile(params.id)
  const availablePostsPromise = getAvilablePostsByUserId(params.id)
  const soldPostsPromise = getSoldPostsByUserId(params.id)

  const [profile, availablePosts, soldPosts] = await Promise.all([profilePromise, availablePostsPromise, soldPostsPromise])

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
          {availablePosts.map((postItem: { post: PostType; userInfo: UserType }) => <Post key={postItem.post._id} postItem={postItem} />)}
        </div>
      </div>
      {soldPosts.length > 0 && <div>
        <h2 className="text-xl  font-semibold mt-8">Sold posts</h2>
        <div className='flex flex-nowrap overflow-x-scroll gap-8 p-8 justify-center'>
          {soldPosts.map((postItem: { post: PostType; userInfo: UserType }) => <Post key={postItem.post._id} postItem={postItem} />)}
        </div>
      </div>}
    </div>
  )
}

export default SellerProfile