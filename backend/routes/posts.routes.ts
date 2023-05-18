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
  addPostToFavourites,
} from "../controllers/Post.controller";

const postRouter = express.Router();

postRouter.get("/:id", getPostsByUserId);
postRouter.get("/post/:id", getPostById);
postRouter.get("/", getAvailablePosts); // this is what should be used in the discover page
postRouter.get("/available/:id", getAvailablePostsByUserId);
postRouter.get("/sold/:id", getSoldPostsByUserId);
postRouter.get("/price/:price", getPostsByPrice);
postRouter.get("/genre/:genre", getPostsByGenre);
postRouter.get("/all", getAllPosts);
postRouter.post("/create", createPost);
postRouter.put("/update/:id", updatePost);
postRouter.put("/updateStatus/:id", updatePostStatus);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/addFavourite/:id", addPostToFavourites);

export { postRouter };
