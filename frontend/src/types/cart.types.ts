import { PostType } from "./post.types";
import { UserType } from "./user.types";

export type CartType = {
  _id: string;
  userId: string;
  posts: { post: PostType; userInfo: UserType }[];
  totalPrice: number;
};
