"use client";

import { API, getCart } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../utils/utils";
import {BsCartPlus, BsCartXFill} from 'react-icons/bs'

const CartButton: React.FC<{ postId: string }> = ({ postId }) => {
  const { getToken } = useAuth();

  const { data, refetch, isLoading } = useQuery(["cart"], async () =>
    getCart({ auth: `Bearer ${await getToken()}` })
  );

  const mutateCart = useMutation(
    async (id: string) => {
      const res = await axios.post(
        `${API}/carts/${id}`,
        {},
        { headers: { authorization: `Bearer ${await getToken()}` } }
      );
      return res.data;
    },
    { onSuccess: () => refetch() }
  );

  return (
    <button
      className="flex w-full cursor-pointer items-center justify-center px-8 py-2 "
      onClick={() => mutateCart.mutate(postId)}
      disabled={mutateCart.isLoading || isLoading}
    >
      {mutateCart.isLoading ? (
        <Spinner />
      ) : data?.posts.map((post) => post.post._id).includes(postId) ? (
        <BsCartXFill className="text-red-500" />
      ) : (
        <BsCartPlus />
      )}
    </button>
  );
};

export default CartButton;
