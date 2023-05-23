import { PostType } from "./post.types";

export type CartType = {
  _id: string;
  userId: string;
  posts: PostType[];
  totalPrice: number;
};
