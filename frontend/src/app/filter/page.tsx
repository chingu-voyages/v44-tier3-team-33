"use client"
import Filter from '@/components/filters/Filters'
import PostGrid from '@/components/post/PostGrid'
import { usePostState } from '@/hooks/postsState'
import { PostType } from '@/types/post.types'
import { UserType } from '@/types/user.types'
import { getFilteredPosts, getGenres } from '@/utils/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState} from 'react'

async function FilteredPostsPage() {
  const [posts, setPosts] = useState<{post: PostType, userInfo: UserType}[]>([])
  const [genres, setGenres] = useState([])
  // const { posts } = 
  // const posts = await getFilteredPosts(filters)
  const searchParams = useSearchParams()
  useEffect(() => {
    const getPosts = async () => {
      const price = searchParams.get('price')
      console.log(price)
      const genreId = searchParams.get('genreId')
      console.log(genreId)
    
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
  // const posts = usePostState(state => state.posts)
  console.log(posts)

  
  return (
    <>
      <Filter genres={genres} />
      {!posts.length ? (<h3>No posts found for selected filters.</h3>) :
        <React.Suspense fallback={<h3>loading...</h3>}><PostGrid posts={posts} /> </React.Suspense>
      }   
    </>
  )
}

export default FilteredPostsPage