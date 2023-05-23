import CartItem from "@/components/cart/CartItem";
import { getCart } from "@/utils/utils";
import React from "react";

const page = async () => {
  const cart = await getCart();
  if (!cart) {
    return <div>The cart is currently empty </div>;
  }
  return (
    <div className="flex w-10/12 flex-col gap-2 text-black">
      <div>
        <h2 className="text-3xl">Your Cart</h2>
        <hr className="w-full" />
      </div>
      <div className=" flex w-full flex-col items-center gap-1">
        {cart[0].posts.map((item: any) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      <div className="w-full p-4">
        <h6 className="text-right">
          Total ({cart[0].posts.length} items) :{" "}
          <span className="font-bold">{cart[0].totalPrice}.00$</span>
        </h6>
      </div>
    </div>
  );
};

export default page;
