import express from "express";
import {
  getAllPosts,
  createPost,
  getPostsByUserId,
  deletePost,
} from "../controllers/Post.controller";

const postRouter = express.Router();

postRouter.get("/:id", getPostsByUserId);
postRouter.get("/", getAllPosts);
postRouter.post("/create", createPost);
postRouter.delete("/delete/:id", deletePost);

export { postRouter };
