import { Post } from "../models/Post.model";
import { Request, Response } from "express";
import { Genre } from "../models/Genre.model";
import { users } from "@clerk/clerk-sdk-node";

interface PublicMetadata {
  posts: any[]; // Update the type of posts as needed
  "fav-genres": string[]; // Update the type of fav-genres as needed
}

//get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//get post by id
export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//create post
export const createPost = async (req: Request, res: Response) => {
  const { createdBy, image, author, title, genres, isbn, condition, price } =
    req.body;
  // find genre by id
  const genre = await Genre.findById(genres);
  // get clerk current user
  const user = await users.getUser(createdBy);
  // create user metadata
  const user_metadata: PublicMetadata = {
    ...user.publicMetadata,
    posts: [],
    "fav-genres": [],
  };

  try {
    const newPost = new Post({
      createdBy,
      image,
      author,
      title,
      genres,
      isbn,
      condition,
      price,
    });

    // add post to genre
    if (genre) {
      genre.posts.push(newPost._id);
      await genre.save();
    }

    // add post to user
    const params = { posts: newPost._id }; // add post.id as param
    await users.updateUser(createdBy, {
      publicMetadata: { ...user_metadata, ...params },
    });
    await newPost.save();
    // update current genre with new post
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};
