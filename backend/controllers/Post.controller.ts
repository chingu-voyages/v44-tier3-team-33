import { Post } from "../models/Post.model";
import { Genre } from "../models/Genre.model";
import { Request, Response } from "express";
import { users, WithAuthProp } from "@clerk/clerk-sdk-node";
import mongoose from "mongoose";

import { CreatePostType } from "../validation/post.validate";
import { getPostsWithUser, getPostWithUser } from "../utils/utils";
import { BookStatusEnum, PostType } from "../types/post.types";
import { Cart } from "../models/Cart.models";

//get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = (await Post.find({ status: "available" })) as PostType[];
    const postsWithUser = await getPostsWithUser({ posts: posts });
    console.log(posts);
    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//get post by id
export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("genres");

    if (!post?.createdBy || !post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await users.getUser(post.createdBy);
    const postWithUser = {
      post,
      userInfo: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.profileImageUrl,
        publicMetadata: user.publicMetadata,
      },
    };
    res.status(200).json({ data: postWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const buyPosts = async (req: Request, res: Response) => {
  const postsIds = req.body.postsIds as string[];
  console.log(postsIds);

  const userId = req.auth.userId;
  try {
    const posts = await Post.updateMany(
      { _id: { $in: postsIds } },
      { status: BookStatusEnum[1], boughtBy: userId }
    );
    console.log(posts);
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const newCartPosts = cart.posts.filter((post) => {
      return !postsIds.includes(post.toString());
    });

    cart.posts = newCartPosts;
    await cart.save();

    console.log(cart);
    return res.status(200).json({
      message: "success",
    });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

// get posts by user id
export const getPostsByUserId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const posts = (await Post.find({ createdBy: id })) as PostType[];

    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postsWithUser = await getPostsWithUser({ posts: posts });
    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts that are available
export const getAvailablePosts = async (req: Request, res: Response) => {
  try {
    const posts = (await Post.find({ status: "available" })) as PostType[];

    const postsWithUser = await getPostsWithUser({ posts: posts });
    console.log(postsWithUser);

    res.status(200).json({ data: postsWithUser });
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
    const posts = await Post.find({ createdBy: id, status: "available" }).limit(
      2
    );
    const postsWithUser = await Promise.all(
      posts.map(async (post) => {
        const user = await users.getUser(post.createdBy);
        return {
          post: post,
          userInfo: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            profileImageUrl: user.profileImageUrl,
            publicMetadata: user.publicMetadata,
          },
        };
      })
    );
    console.log(postsWithUser);
    res.status(200).json(postsWithUser);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get Available post by user

export const getAvailablePostByUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = (await Post.findOne({
      _id: id,
      status: "available",
    })) as PostType;
    const postWithUser = await getPostWithUser({ post: post });
    res.status(200).json(postWithUser);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts sold by user id

export const getSoldPostsByUserId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const posts = (await Post.find({
      createdBy: id,
      status: "sold",
    })) as PostType[];

    const postsWithUser = await getPostsWithUser({ posts: posts });

    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get posts by genre

export const getPostsByGenre = async (req: Request, res: Response) => {
  // this might change to req.body
  const id = req.params.id;
  console.log(id);
  try {
    const posts = (await Post.find({
      genres: id,
      status: "available",
    })) as PostType[];
    const postsWithUser = await getPostsWithUser({ posts: posts });

    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get available posts where price is less than or equal to

export const getPostsByPrice = async (req: Request, res: Response) => {
  const price = req.params.price;
  try {
    const posts = (await Post.find({
      price: { $lte: price },
      status: "available",
    })) as PostType[];
    const postsWithUser = await getPostsWithUser({ posts: posts });

    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByFilters = async (req: Request, res: Response) => {
  const filters = req.body.filters;
  console.log(req.body);

  try {
    const posts = (await Post.find({
      price: { $lte: filters.price },
      genres: filters.genreId,
      status: "available",
    })) as PostType[];
    const postsWithUser = await getPostsWithUser({ posts: posts });

    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//create post

export const createPost = async (req: WithAuthProp<Request>, res: Response) => {
  const {
    body: { post },
  } = req as CreatePostType;

  console.log(req.auth.userId);

  if (!req.auth.userId || !req.auth) {
    return res.status(401).json({ message: "this user is not authed" });
  }

  const user = await users.getUser(req.auth.userId);

  if (!user.id) {
    return res.status(401).json({ message: "this user is not authed" });
  }

  // find genre by id
  const postGenres = await Promise.all(
    post.genre.map(async (genre: any) => {
      const genreNew = await Genre.findOne({ genreName: genre });
      if (genreNew) return genreNew._id;
      const createdGenre = await Genre.create({ genreName: genre });
      return createdGenre._id;
    })
  );

  try {
    const newPost = await Post.create({
      createdBy: user.id,
      genres: postGenres,
      imgs: post.imagesURLs,
      ...post,
    });

    console.log(newPost);

    //if user has no public metadata, create it
    if (!user.publicMetadata.posts) {
      console.log("no public metadata");
      await users.updateUser(user.id, {
        publicMetadata: {
          posts: [newPost._id.toString()],
        },
      });

      res.status(200).json(newPost);
    } else {
      // if user has public metadata, add post to it
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
    }
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error });
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

// add post to user's Favorites

export const addPostToFavorites = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const user = await users.getUser(userId);

    // check if favourites private metadata exists
    if (!user.privateMetadata.favourites) {
      await users.updateUser(userId, {
        privateMetadata: {
          favourites: [id.toString()],
        },
      });

      return res.status(200).json({ message: "Post added to favourites" });
    } else {
      const favourites = user.privateMetadata.favourites as string[];
      favourites.push(id.toString());
      await users.updateUser(userId, {
        privateMetadata: {
          favourites: favourites,
        },
      });

      return res.status(200).json({ message: "Post added to favourites" });
    }
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

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req: Request, res: Response) => {
  const { searchQuery } = req.params;
  console.log(searchQuery);

  try {
    const posts = (await Post.find({
      title: { $regex: searchQuery, $options: "i" },
      status: "available",
    })) as PostType[];
    const postsWithUser = await getPostsWithUser({ posts: posts });

    res.status(200).json({ data: postsWithUser });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
