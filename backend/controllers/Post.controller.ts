import { Post } from "../models/Post.model";
import { Request, Response } from "express";
import { Genre } from "../models/Genre.model";
import { users } from "@clerk/clerk-sdk-node";

//get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    console.log(posts);
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

// get posts by user id
export const getPostsByUserId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const posts = await Post.find({ createdBy: id });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts that are available
export const getAvailablePosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ status: "available" });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts available by user id

export const getAvailablePostsByUserId = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  try {
    const posts = await Post.find({ createdBy: id, status: "available" });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts sold by user id

export const getSoldPostsByUserId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const posts = await Post.find({ createdBy: id, status: "sold" });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts by genre

export const getPostsByGenre = async (req: Request, res: Response) => {
  // this might change to req.body
  const id = req.params.id;
  try {
    const posts = await Post.find({ genres: id });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get available posts where price is less than or equal to

export const getPostsByPrice = async (req: Request, res: Response) => {
  const price = req.params.price;
  try {
    const posts = await Post.find({
      price: { $lte: price },
      status: "available",
    });
    res.status(200).json(posts);
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
    await newPost.save();

    // define public metadata posts
    const posts = user.publicMetadata.posts as string[];
    // add post to user metadata
    posts.push(newPost._id.toString());
    // update user metadata
    await users.updateUser(user.id, {
      publicMetadata: {
        posts: posts,
      },
    });
    console.log(user.publicMetadata.posts);
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

// update post general info

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { image, author, title, genres, isbn, condition, price } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        image,
        author,
        title,
        genres,
        isbn,
        condition,
        price,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// update post status (available or sold)
export const updatePostStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// delete post
export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    // remove post from genre
    await Genre.updateOne(
      { _id: post?.genres },
      { $pull: { posts: post?._id } }
    );
    await Post.findByIdAndDelete(id);
    // remove post from user metadata
    const user = await users.getUser(post?.createdBy as string);
    const posts = user.publicMetadata.posts as string[];
    const index = posts.indexOf(id);
    if (index > -1) {
      posts.splice(index, 1);
    }
    await users.updateUser(user.id, {
      publicMetadata: {
        posts: posts,
      },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
