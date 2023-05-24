"use client";

import { PostType } from "@/types/post.types";
import { get } from "http";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartItem = async ({ item }: { item: PostType }) => {
  const { title, imgs, price, condition, description, isbn, createdBy } = item;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(
        `http://localhost:3000/posts//availablePost/${item._id}`
      );
      const data = await res.json();
      setUserData(data);
      console.log(data[0].userInfo.firstName);
    };
    getUserData();
  }, [item._id]);

  const { firstName, lastName } = userData[0]?.userInfo;

  return (
    <div className="flex w-full items-center justify-between border-b p-4 text-black">
      <div className=" rounded-md border border-t-fuchsia-950">
        <Image src={imgs?.[0]} width={150} height={150} alt="product" />
      </div>
      <div className="flex flex-col">
        <div>
          <h2 className=" text-xl">{title}</h2>
        </div>
        <div>
          <h4>{description}</h4>
        </div>
        <div>
          <h4>Created by :{firstName}</h4>
        </div>
        <div>
          <h4>Condition : {condition}</h4>
        </div>
        <div>
          <h4>ISBN : {isbn}</h4>
        </div>
        <div>
          <h4 className=" font-bold">{price}.00$</h4>
        </div>
      </div>
      <button className=" flex items-center gap-1 rounded-md border px-4 py-2 text-black hover:bg-[#f5dcd7]">
        <RiDeleteBinLine color="#EE4B2B" size={16} /> Remove
      </button>
    </div>
  );
};

export default CartItem;
