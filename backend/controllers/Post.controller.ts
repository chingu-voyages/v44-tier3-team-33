import { Post } from "../models/Post.model";
import mongoose from "mongoose";

//get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
