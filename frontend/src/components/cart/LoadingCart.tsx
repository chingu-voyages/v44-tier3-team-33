import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import { Skeleton } from "../ui/skeleton";

const LoadingCart = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between border-b p-4 text-black md:flex-row">
      <div className=" relative h-52 w-40 rounded-md border border-t-fuchsia-950">
        <Skeleton className="bg-gray-600 w-full h-full" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center ">
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
        <div>
          <Skeleton className=" h-6 w-44 bg-gray-400" />
        </div>
      </div>
      <button

        className=" flex items-center gap-1 rounded-md border px-4 py-2 text-black hover:bg-[#f5dcd7]"
      >
        <RiDeleteBinLine color="#EE4B2B" size={16} /> Remove
      </button>
    </div>
  );
};

export default LoadingCart;
