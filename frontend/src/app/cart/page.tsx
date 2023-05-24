import CartItem from "@/components/cart/CartItem";
import { getCart } from "@/utils/fetchData";
import { CgShoppingCart } from "react-icons/cg";

const page = async () => {
  const cart = await getCart();
  console.log(cart);
  if (!cart) {
    return (
      <div className="mt-6 flex w-10/12 flex-col text-black">
        <div className=" flex w-full flex-col items-center gap-1">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <CgShoppingCart size={100} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-10/12 flex-col gap-2 text-black">
        <div>
          <h2 className="text-3xl">Your Cart</h2>
          <hr className="w-full" />
        </div>
        <div className=" flex w-full flex-col items-center gap-1">
          {cart[0].posts.map((item: any) => (
            /* @ts-expect-error Server Component */
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
  }
};

export default page;
