import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

import { Skeleton } from "../ui/skeleton";

export function LoadingPost() {
  return (
    <div className="flex w-[250px] cursor-pointer flex-col items-center  justify-between rounded-xl border-2 border-gray-200 text-black md:w-[300px]">
      <Skeleton className=" relative h-56 w-40 rounded-md border  bg-gray-400 "></Skeleton>
      <div className="flex w-full flex-grow flex-col justify-between p-4">
        <div className="flex flex-grow justify-between  gap-8">
          <Skeleton className="mb-2 h-6 w-full bg-gray-300 text-lg font-bold md:text-xl "></Skeleton>
          <Skeleton className="h-6 w-1/4 bg-gray-300 text-lg font-light"></Skeleton>
        </div>
        <Skeleton className="h-6 w-full overflow-hidden border-gray-200 bg-gray-300 text-black"></Skeleton>
        <div className="mt-2 flex flex-shrink justify-center text-black">
          <div className="flex w-full items-center justify-center border-2  border-r-0  border-gray-300 px-8 py-2 text-2xl">
            <AiOutlineHeart />
          </div>
          <div className="flex w-full items-center justify-center border-2 border-gray-300  text-2xl ">
            <BsCartPlus />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingPostGrid({ posts }: { posts: { id: number }[] }) {
  return (
    <div className="mx-auto grid grid-cols-1 justify-center justify-items-center gap-8 py-8 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((postItem) => (
        <LoadingPost key={postItem.id} />
      ))}
    </div>
  );
}
