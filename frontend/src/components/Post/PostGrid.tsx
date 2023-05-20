import { PostType } from '@/utils/utils'
import React from 'react'
import Post from './Post'

export type PostCardType= {
  post: {
    _id: string;
    image: string;
    title: string;
    price: number;
  },
  userInfo: {
    firstName: string;
    lastName: string;
  };
}

function PostGrid({ posts }: {posts: PostType[]}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center justify-items-center gap-8'>
        {posts.map((postItem: PostCardType) => <Post key={postItem.post._id} postItem={postItem} />)}        
    </div> 
  )
}

export default PostGrid