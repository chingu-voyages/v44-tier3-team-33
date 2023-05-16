import express from "express";
import { getAllPosts } from "../controllers/Post.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);

export { postRouter };
