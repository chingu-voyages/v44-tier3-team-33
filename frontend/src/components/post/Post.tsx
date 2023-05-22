import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

function Post({
  postItem,
}: {
  postItem: { post: PostType; userInfo: UserType };
}) {
  const { userInfo, post } = postItem;
  const { title, imgs, price } = post;

  return (
    <div className="flex w-[250px] flex-col rounded-xl border-2 border-gray-200 text-black md:w-[300px]">
      <Image
        src={imgs?.[0]}
        alt={title}
        width={200}
        height={400}
        className="h-[400px] w-full rounded-t-xl"
      />
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
          <button className="flex w-full items-center justify-center border-2  border-r-0  border-gray-300 px-8 py-2 text-2xl">
            <AiOutlineHeart />
          </button>
          <button className="flex w-full items-center justify-center border-2 border-gray-300 px-8 py-2 text-2xl ">
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
