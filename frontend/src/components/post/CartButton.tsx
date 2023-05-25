"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton: React.FC<{ postId: string }> = ({ postId }) => {
  const { getToken } = useAuth();

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center px-8 py-2 "
      onClick={async () => {
        const res = await axios.post(
          `http://localhost:3001/carts/${postId}`,
          {},
          { headers: { authorization: `Bearer ${await getToken()}` } }
        );
        console.log(res.data);
      }}
    >
      <AiOutlineShoppingCart />
    </div>
  );
};

export default CartButton;
