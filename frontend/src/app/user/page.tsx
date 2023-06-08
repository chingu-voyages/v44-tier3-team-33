import React from 'react'
import { auth } from '@clerk/nextjs'
import { getAvilablePostsByUserId, getSoldPostsByUserId, getUserProfile } from '@/utils/utils'
import Profile from '@/components/Profile'


async function UserProfilePage() {
  const { userId } = auth()

  const profilePromise = getUserProfile(userId!)
  const availablePostsPromise = getAvilablePostsByUserId(userId!)
  const soldPostsPromise = getSoldPostsByUserId(userId!)

  const [profile, availablePosts, soldPosts] = await Promise.all([profilePromise, availablePostsPromise, soldPostsPromise])

  return (
    <Profile profile={profile} availablePosts={availablePosts} soldPosts={soldPosts} userId={userId}/>    
  )
}

export default UserProfilePage