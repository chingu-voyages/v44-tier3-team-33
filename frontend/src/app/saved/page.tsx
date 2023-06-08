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
  }, []);

  if (!userId)
    return (
      <p className="bg-red-200 p-4 text-center text-red-600">
        Please login to see Favorites
      </p>
    );

  if (!posts.length)
    return <p className="text-center">No favourites added yet!</p>;

  return (
    <>
      <h1 className="text-center text-xl font-bold">Your Saved posts</h1>
      <PostGrid posts={posts} />
    </>
  );
}

export default Saved;
