import { CartType } from "@/types/cart.types";
import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import axios from "axios";

const url = "https://bookmart-miv5.onrender.com/";

export async function getPosts() {
  try {
    const response = await axios.get<{
      data: { post: PostType; userInfo: UserType }[];
    }>(`https://bookmart-miv5.onrender.com/posts`);

    if ((response.status !== 200, !response.data.data)) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
}

export const getCart = async (props: { auth: string }) => {
  try {
    const response = await axios.get<{
      data: CartType;
    }>(`https://bookmart-miv5.onrender.com/carts`, {
      headers: {
        Authorization: props.auth,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
};
