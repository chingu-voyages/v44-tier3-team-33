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
    <div className="grid grid-cols-1 justify-center justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 py-8">
      {posts.map((postItem) => (        
        <Post key={postItem.post._id} postItem={postItem} />       
      ))}
    </div>
  );
}

export default PostGrid;
