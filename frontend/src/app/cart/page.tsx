import CartItem from "@/components/cart/CartItem";
import { getCart } from "@/utils/utils";
import { clerkClient } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const cart = await getCart();
  if (!cart) {
    return <div>The cart is currently empty </div>;
  }
  return (
    <div className="flex w-full flex-col items-start justify-center gap-5 text-black">
      {cart[0].posts.map((item: any) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default page;
