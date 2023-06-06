"use client"

import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { PostType } from '@/types/post.types';
import { UserType } from '@/types/user.types';
import { HiDocumentAdd } from "react-icons/hi"
import { BiEditAlt } from "react-icons/bi"

import Post from "./post/Post"
import { useUser } from '@clerk/nextjs';

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
  const [userInfo, setUserInfo ] = useState({
    firstName: "",
    lastName: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  
  const { firstName, lastName, profileImageUrl } = profile
  const { user } = useUser()

  async function updateUser () {
    await user?.update({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName
    })
    user?.reload()
  }
  const buttonStyle = "px-8 py-2  bg-emerald-500 font-bold text-white rounded-lg hover:opacity-50 focus:opacity-50"

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target
    setUserInfo((prevInfo) => ({...prevInfo, [name]: value}))
  }
  
  return (
    <div className='mx-auto text-center md:mt-8 p-8'>
      <div className='mb-4'>
        <Image src={profileImageUrl} className='rounded-full mx-auto' alt="avatar" width={250} height={250} />
      </div>      
      { user &&  
        <button className='inline-flex gap-4 justify-center items-center text-gray-500' onClick={() => setIsEditing(true)}>
          <span>Edit name</span><BiEditAlt size={20} />
        </button> 
      }
      <div>
        { user && isEditing ? 
          <>           
            <form className="flex flex-col gap-4 md:flex-row my-8 justify-center">
              <input className="border-2 border-gray-200 p-2 rounded-lg" type="text" value={firstName} name="firstName" onChange={handleChange} /> 
              <input className="border-2 border-gray-200 p-2 rounded-lg" type="text" value={lastName} name="lastName" onChange={handleChange} />
              <div className='flex gap-4 justify-center'>
                <button className={`${buttonStyle} bg-emerald-500`} type="submit" onClick={updateUser}>Save</button>
                <button className={`${buttonStyle} bg-red-500`} type="button" onClick={() => setIsEditing(false)}>Cancel</button>              
              </div>
            </form>
          </>
            : 
          <h1 className='text-3xl font-bold text-center'>{firstName} {lastName}</h1>
        }
        {userId && <Link href="/post" className='border-2 border-gray-300 px-8 py-2 rounded-lg flex justify-center items-center gap-2 mt-4 md:hidden'>Add Post <HiDocumentAdd  /></Link>}
        <h2 className="text-xl  font-semibold mt-8">Available posts</h2>
        <div className='flex flex-nowrap overflow-x-scroll gap-8 p-8 justify-center items-center'>
          {userId && (
            <div className="xs:hidden md:block w-[200px] mr-8">
              <Link href="/post" ><HiDocumentAdd size={280}  /><p className='text-center'>Add post</p></Link>
            </div>
          )}
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