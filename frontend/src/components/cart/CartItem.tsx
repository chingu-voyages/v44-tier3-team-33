"use client";

import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import { API } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";

const CartItem = ({
  item,
  refetch,
}: {
  item: { post: PostType; userInfo: UserType };
  refetch: () => void;
}) => {
  const { title, imgs, price, condition, description, isbn } =
    item.post;
  const { firstName, lastName } = item.userInfo;

  const { getToken } = useAuth();
  const removeItem = useMutation(async () => {
    const res = await axios.post(
      `${API}/carts/${item.post._id}`,
      {},
      { headers: { authorization: `Bearer ${await getToken()}` } }
    );
    return res.data
  },{onSuccess: () => refetch()});

  return (
    <div className="flex w-full flex-col items-center justify-between border-b p-4 text-black md:flex-row">
      <div className=" relative h-52 w-40 rounded-md border border-t-fuchsia-950">
        <Image
          src={imgs?.[0]}
          alt="product"
          fill
          sizes="(max-width: 500px) 100px, (max-width: 900px) 200px, (max-width: 1200px) 300px, "
          className="rounded-md"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center ">
        <div>
          <h2 className=" text-xl">{title}</h2>
        </div>
        <div>
          <h4>{description}</h4>
        </div>
        <div>
          <h4>
            Created by :{firstName} {lastName}
          </h4>
        </div>
        <div>
          <h4>Condition : {condition}</h4>
        </div>
        <div>
          <h4>ISBN : {isbn}</h4>
        </div>
        <div>
          <h4 className=" font-bold">{price.toFixed(2)}$</h4>
        </div>
      </div>
      <button
        className=" flex items-center gap-1 rounded-md border px-4 py-2 text-black hover:bg-[#f5dcd7]"
        onClick={() => removeItem.mutate()}
        disabled={removeItem.isLoading}
      >
        <RiDeleteBinLine color="#EE4B2B" size={16} /> Remove
      </button>
    </div>
  );
};

export default CartItem;
