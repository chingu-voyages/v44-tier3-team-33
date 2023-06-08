"use client";

import PostGrid from "@/components/post/PostGrid";
import { getFavouritePosts } from "@/utils/utils";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function Saved() {
  const [posts, setPosts] = useState([]);
  const { getToken, userId } = useAuth();

  useEffect(() => {
    async function getPosts() {
      const token = await getToken();
      if (token && userId) {
        const savedPosts = await getFavouritePosts(userId, token);
        setPosts(savedPosts);
      }
    }
    getPosts();
  }, [getToken, userId]);

  if (!userId)
    return (
      <p className="bg-red-200 p-4 text-center text-red-600">
        Please login to see Favorites
      </p>
    );

  if (!posts.length)
    return <p className="text-center">No favourites added yet!</p>;

  return (
    <div className="md:mt-8">
      <h1 className="text-center text-xl font-bold md:text-3xl">
        Your Saved posts
      </h1>
      <PostGrid posts={posts} />
    </div>
  );
}

export default Saved;
