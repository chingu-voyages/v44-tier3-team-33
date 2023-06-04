"use client"
import PostGrid from '@/components/post/PostGrid'
import { PostType } from '@/types/post.types'
import { UserType } from '@/types/user.types'
import { getPostsBySearch } from '@/utils/utils'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function SearchPage() {
  const { searchQuery } = useParams()
  const [posts, setPosts] = useState<{post: PostType, userInfo: UserType}[]>([])
 
  useEffect(() => {
    const getPosts = async() => {
      const posts = await getPostsBySearch(searchQuery)
      setPosts(posts.data)
    }
    getPosts()
  }, [searchQuery])

  return (
    <>
      { posts.length ? 
        (<>
          <h3 className='text-lg md:text-xl text-gray-500 font-semibold mt-0'>Showing results for <span className='text-black'>{searchQuery}</span></h3>
          <PostGrid posts={posts} />
        </>) : 
        <p>No posts found. Please try another search</p>
      }
    </>
  )
}

export default SearchPage