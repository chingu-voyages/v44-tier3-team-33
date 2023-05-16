import express from "express";
import { getAllPosts, createPost } from "../controllers/Post.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/create", createPost);

export { postRouter };
