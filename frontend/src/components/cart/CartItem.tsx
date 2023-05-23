import Image from "next/image";
import React from "react";

const CartItem = () => {
  return (
    <div className="flex w-1/2 items-center justify-between border p-4 text-black">
      <div className=" rounded-md border border-t-fuchsia-950">
        <Image src="" width={100} height={100} alt="product" />
      </div>
      <div className="flex flex-col">
        <div>
          <h2>Name of the book</h2>
        </div>
        <div>
          <h3> Name of the seller</h3>
        </div>
        <div>
          <h4>10.00$</h4>
        </div>
      </div>
      <div>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
