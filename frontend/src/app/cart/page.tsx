import CartItem from "@/components/cart/CartItem";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-5 text-black">
      <CartItem />
    </div>
  );
};

export default page;
