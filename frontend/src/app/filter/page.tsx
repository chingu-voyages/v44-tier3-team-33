"use client"
import React, { useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Filter from '@/components/filters/Filters'
import PostGrid from '@/components/post/PostGrid'
import { PostType } from '@/types/post.types'
import { UserType } from '@/types/user.types'
import { getFilteredPosts, getGenres } from '@/utils/utils'

async function FilteredPostsPage() {
  const [posts, setPosts] = useState<{post: PostType, userInfo: UserType}[]>([])
  const [genres, setGenres] = useState([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const getPosts = async () => {
      const price = searchParams.get('price')
      const genreId = searchParams.get('genreId')
    
      const posts = await getFilteredPosts({price : price ? parseInt(price): 100, genreId: genreId ? genreId : ""})
      setPosts(posts.data)
    }
    getPosts()

  }, [searchParams])

  useEffect(() => {
    const fetchGenres = async() => {
      const genres = await getGenres()
      setGenres(genres)
    }
    fetchGenres()
  }, [])
   
  return (
    <div className='flex flex-col items-center w-[90%]'>
      <Filter genres={genres} />
      {!posts.length ? 
        (<h3>No posts found for selected filters.</h3>) :
        (<>
          <p>Showing {posts.length} {posts.length === 1 ? "result" : "results"}</p>
          <PostGrid posts={posts} />
        </>)
      }   
    </div>
  )
}

export default FilteredPostsPage