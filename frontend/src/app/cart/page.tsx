"use client";

import CartItem from "@/components/cart/CartItem";
import { PrimaryButton } from "@/components/utils/utils";
import { API, getCart } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgShoppingCart } from "react-icons/cg";

const Cart = async () => {
  const { getToken } = useAuth();

  const {
    data: cart,
    refetch,
    isLoading,
  } = useQuery(
    ["cart"],
    async () => getCart({ auth: `Bearer ${await getToken()}` }),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  const buyPosts = useMutation(async () => {
    const res = await axios.post(
      `${API}/posts/buy`,
      {postsIds: cart?.posts.map((item) => item.post._id)},
      { headers: { authorization: `Bearer ${await getToken()}` } }
    );
    return res.data
  },{onSuccess: (data) => {
    console.log(data);
      refetch()}});

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  if (!cart || cart?.posts.length <= 0) {
    return (
      <div className="mt-6 flex w-10/12 flex-col text-black">
        <div className=" flex w-full flex-col items-center gap-1">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <CgShoppingCart size={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-10/12 flex-col justify-center items-center gap-2 text-black">
      <div>
        <h2 className="text-3xl">Your Cart</h2>
        <hr className="w-full" />
      </div>
      <div className=" flex w-full flex-col items-center gap-1">
        {cart.posts.map((item) => (
          <CartItem
            key={item.post._id}
            item={item}
            refetch={() => {
              refetch();
            }}
          />
        ))}
      </div>
      <div className="w-full flex flex-row-reverse justify-start items-center gap-3 p-4">
        <div>
          <PrimaryButton label="Checkout" onClick={()=>{
            buyPosts.mutate()
          }}  />
        </div>
        <h6 className="text-right">
          Total ({cart.posts.length} items) :{" "}
          <span className="font-bold">{cart.posts.reduce((value, b) => value + b.post.price,0).toFixed(2)}$</span>
        </h6>
      </div>
    </div>
  );
};

export default Cart;
