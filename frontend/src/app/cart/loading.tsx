import LoadingCart from '@/components/cart/LoadingCart'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex w-10/12 flex-col justify-center items-center gap-2 text-black">
      <div>
        <h2 className="text-3xl">Your Cart</h2>
        <hr className="w-full" />
      </div>
      <div className=" flex w-full flex-col items-center gap-1">
        {Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })).map((item) => (
          <LoadingCart key={item.id} />          
        ))}
      </div>
      <div className="w-full p-4">
        <Skeleton className="h-6"/>
      </div>
    </div>
  )
}

export default Loading
