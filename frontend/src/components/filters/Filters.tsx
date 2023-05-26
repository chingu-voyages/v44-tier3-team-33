"use client"

import { GenreType } from '@/types/genre.type'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Filter({ genres }: { genres: GenreType[]}) {
  const [price, setPrice] = useState(100)
  const [genreId, setGenreId] = useState("")
  const router = useRouter()

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>){
    setPrice(parseInt(event.target.value))
  }
  function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>){
    setGenreId(event.target.value)
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    router.push(`/filter?price=${price}&genreId=${genreId}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col md:flex-row gap-4 md:inline-flex items-baseline'>
        <label className=''>Genre</label>
        <select className='bg-black text-white p-2 border-black rounded-lg mb-8 cursor-pointer' value={genreId} onChange={handleGenreChange}>
          {genres.map((genre: GenreType) => <option key={genre._id} value={genre._id} >{genre.genreName}</option>)}
        </select>
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:inline-flex md:ml-4 items-bseline'>
        <label className='md:my-4'>Price</label>
        <input type="range" defaultValue={0} onChange={handlePriceChange} />
      </div>
      <button className='block md:inline-block px-6 py-2 bg-emerald-500 text-white rounded-lg my-8 md:ml-4' type='submit'>Apply</button>
    </form>
  )
}

export default Filter