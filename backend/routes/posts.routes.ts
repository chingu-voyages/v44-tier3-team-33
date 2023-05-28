import express from "express";
import {
  getAllPosts,
  getPostsByUserId,
  getAvailablePosts,
  getAvailablePostsByUserId,
  getSoldPostsByUserId,
  getPostsByPrice,
  getPostsByGenre,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  updatePostStatus,
  addPostToFavorites,
  getPostsByFilters,
  getPostsBySearch
} from "../controllers/Post.controller";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

import validateReq from "../middleware/validateReq";
import { createPostSchema } from "../validation/post.validate";
const postRouter = express.Router();

postRouter.post("/filters", getPostsByFilters);
postRouter.get("/:searchQuery", getPostsBySearch);
postRouter.get("/user/:id", getPostsByUserId);
postRouter.get("/post/:id", getPostById);
postRouter.get("/", getAvailablePosts); // this is what should be used in the discover page
postRouter.get("/available/:id", getAvailablePostsByUserId);
postRouter.get("/sold/:id", getSoldPostsByUserId);
postRouter.get("/price/:price", getPostsByPrice);
postRouter.get("/genre/:id", getPostsByGenre);
postRouter.get("/genre/:id", getPostsByGenre);
postRouter.get("/all", getAllPosts);
postRouter.post(
  "/create",
  ClerkExpressWithAuth(),
  validateReq(createPostSchema),
  createPost
);
postRouter.put("/update/:id", ClerkExpressWithAuth(), updatePost);
postRouter.put("/updateStatus/:id", ClerkExpressWithAuth(), updatePostStatus);
postRouter.delete("/delete/:id", ClerkExpressWithAuth(), deletePost);
postRouter.put("/addFavorites/:id", ClerkExpressWithAuth(), addPostToFavorites);

export { postRouter };
