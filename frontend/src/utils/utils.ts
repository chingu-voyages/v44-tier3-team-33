import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";

const url = "https://bookmart-miv5.onrender.com";

export async function getPosts() {
  try {
    const response = await axios.get<{ post: PostType; userInfo: UserType }[]>(
      `${url}/posts`
    );
    if ((response.status !== 200, !response.data)) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getCart() {
  try {
    const user = await currentUser();
    console.log(`${url}/carts/${user?.id}`);
    const response = await axios.get(`${url}/carts/${user?.id}`);
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
