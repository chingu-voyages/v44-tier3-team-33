"use client"

import { getPostsByPrice } from '@/utils/utils'
import React, { useState } from 'react'

function FilterPrice() {
  const [price, setPrice] = useState(1000)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setPrice(parseInt(event.target.value))
    const posts = await getPostsByPrice(price)
    console.log(price)
  }

  return (
    <input type="range" defaultValue={0} onChange={handleChange} />
  )
}

export default FilterPrice