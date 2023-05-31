"use client";

import CartItem from "@/components/cart/CartItem";
import getQueryClient from "@/components/utils/query/getQueryClient";
import { getCart } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
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
    <div className="flex w-10/12 flex-col gap-2 text-black">
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
      <div className="w-full p-4">
        <h6 className="text-right">
          Total ({cart.posts.length} items) :{" "}
          <span className="font-bold">{cart.totalPrice.toFixed(2)}$</span>
        </h6>
      </div>
    </div>
  );
};

export default Cart;
