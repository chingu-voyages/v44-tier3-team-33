import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import axios from "axios";

// const url= "https://v44-tier3-team-33-u43g-heypbzh2c-eslemouederni.vercel.app/"

export async function getPosts() {
  try {
    const response = await axios.get<{ post: PostType; userInfo: UserType }[]>(
      `http://localhost:3001/posts`
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
