import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import CartButton from "./CartButton";

function Post({
  postItem,
}: {
  postItem: { post: PostType; userInfo: UserType };
  cart?: boolean;
}) {
  const { userInfo, post } = postItem;
  const { title, imgs, price } = post;

  return (
    <div className="flex w-[250px] flex-col items-center justify-between  rounded-xl border-2 border-gray-200 text-black md:w-[300px]">
      <div className=" relative h-56 w-40 rounded-md border border-t-fuchsia-950">
        <Image
          src={imgs?.[0]}
          alt="product"
          fill
          sizes="(max-width: 500px) 100px, (max-width: 900px) 200px, (max-width: 1200px) 300px, "
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <div className="flex flex-grow justify-between  gap-8">
          <h3 className="mb-2 text-lg font-bold md:text-xl ">{title}</h3>
          <span className="text-lg font-light">${price}</span>
        </div>
        <p className="overflow-hidden text-black">
          <span className="max-w-full break-words font-light text-gray-500 ">
            Sold by{" "}
          </span>{" "}
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <div className="mt-2 flex flex-shrink justify-center text-black">
          <div className="flex w-full items-center justify-center border-2  border-r-0  border-gray-300 px-8 py-2 text-2xl">
            <AiOutlineHeart />
          </div>
          <div className="flex w-full items-center justify-center border-2 border-gray-300  text-2xl ">
            <CartButton postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
