"use client";

import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import { addToFavorites } from "@/utils/utils";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { set } from "zod";

import CartButton from "./CartButton";

function Post({
  postItem,
}: {
  postItem: { post: PostType; userInfo: UserType };
  cart?: boolean;
}) {
  const { userInfo, post } = postItem;
  const { title, imgs, price } = post;
  const { userId, getToken } = useAuth();

  const storedFavourites = localStorage.getItem("favourites");
  const [favourites, setFavourites] = useState<PostType[]>(
    storedFavourites ? JSON.parse(storedFavourites) : []
  );

  async function addFavorites() {
    const token = await getToken();
    if (!token || !userId) return;
    if (userId && token) {
      const { favourites } = (await addToFavorites(
        post._id,
        userId,
        token
      )) as { favourites: PostType[] };
      setFavourites(favourites);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("favourites", JSON.stringify(favourites));
      }
    }
  }

  function heartIcon() {
    const existingIndex = favourites.findIndex((f) => f._id === post._id);
    return existingIndex !== -1 ? (
      <AiFillHeart className="text-red-600" />
    ) : (
      <AiOutlineHeart className="text-red-600" />
    );
  }

  return (
    <div className="flex w-[250px] cursor-pointer flex-col items-center  justify-between rounded-xl border-2 border-gray-200 text-black md:w-[300px]">
      <div className=" relative h-56 w-40 rounded-md border border-t-fuchsia-950">
        <Link href={`/post/${postItem.post._id}`}>
          <Image
            src={imgs?.[0]}
            alt="product"
            fill
            sizes="(max-width: 500px) 100px, (max-width: 900px) 200px, (max-width: 1200px) 300px, "
          />
        </Link>
      </div>
      <div className="flex  w-full flex-col justify-between p-4">
        <div className="flex w-full justify-between  gap-8">
          <h2 className="mb-2 truncate text-lg font-bold">{title}</h2>
          <span className="text-lg font-light">${price}</span>
        </div>
        <p className="overflow-hidden text-black">
          <span className="max-w-full break-words font-light text-gray-500 ">
            Sold by{" "}
          </span>{" "}
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <div className="mt-2 flex flex-shrink justify-center text-black">
          <button
            onClick={addFavorites}
            className="flex w-full items-center justify-center border-2  border-r-0  border-gray-300 px-8 py-2 text-2xl"
          >
            {heartIcon()}
          </button>
          <div className="flex w-full items-center justify-center border-2 border-gray-300  text-2xl ">
            <CartButton postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
