import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";

const url = "https://bookmart-miv5.onrender.com/";

export async function getPosts() {
  try {
    const response = await axios.get<{
      data: { post: PostType; userInfo: UserType }[];
    }>(`http://localhost:3000/posts`);
    console.log(response.data);
    if ((response.status !== 200, !response.data.data)) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getCart() {
  try {
    const user = await currentUser();
    const response = await axios.get(
      `http://localhost:3000/carts/user_2PryvC1iTckkxAqugm2jXfjOBnh`
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
