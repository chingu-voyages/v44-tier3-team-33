"use client"

import { GenreType } from '@/types/genre.type'
import { getPostsByPrice } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Filter({ genres }: { genres: GenreType[]}) {
  const [price, setPrice] = useState(1000)
  const [genreId, setGenreId] = useState("")
  const router = useRouter()

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>){
    setPrice(parseInt(event.target.value))
  }
  function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>){
    setGenreId(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    router.push("/filters")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className='md:mr-4'>Genre</label>
      <select className='bg-black text-white p-2 border-black rounded-lg mb-8 cursor-pointer' value={genreId} onChange={handleGenreChange}>
        {genres.map((genre: GenreType) => <option key={genre._id} value={genre._id} >{genre.genreName}</option>)}
      </select>
      <label className='md:mr-4'>Price</label>
      <input type="range" defaultValue={0} onChange={handlePriceChange} />
      <button type='submit'>Apply</button>
    </form>
  )
}

export default Filter