import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import Link from "next/link";
import React from "react";

import Post from "./Post";

function PostGrid({
  posts,
}: {
  posts: { post: PostType; userInfo: UserType }[];
}) {
  return (
    <div className="grid grid-cols-1 justify-center justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((postItem) => (
        <Link href={`/post/${postItem.post._id}`} key={postItem.post._id}>
          <Post key={postItem.post._id} postItem={postItem} />
        </Link>
      ))}
    </div>
  );
}

export default PostGrid;
