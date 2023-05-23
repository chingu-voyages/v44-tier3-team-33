"use client"
import { GenreType } from '@/types/genre.type'
import { getPostsByGenre } from '@/utils/utils'
import React, { useState } from 'react'

function SelectGenre({ genres }: { genres: GenreType[]}) {
  const [genreId, setGenreId] = useState("")

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
    setGenreId(event.target.value)
    console.log(genreId)
    const filteredPosts = await getPostsByGenre(genreId)
    console.log(filteredPosts)    
  }

  return (
    <select className='bg-black text-white p-2 border-black rounded-lg mb-8 cursor-pointer' value={genreId} onChange={handleChange}>
      {genres.map((genre: GenreType) => <option key={genre._id} value={genre._id} >{genre.genreName}</option>)}
    </select>
    
  )
}

export default SelectGenre