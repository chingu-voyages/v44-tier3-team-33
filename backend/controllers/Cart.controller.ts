import { Cart } from "../models/Cart.models";
import { users, type WithAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";
import { Post } from "../models/Post.model";
import { getPostsWithUser } from "../utils/utils";
import { PostType } from "../types/post.types";

//Get all carts just for testing

type PopulatedParent = {
  posts: PostType[];
};

export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ data: carts });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Get all carts
export const getCart = async (req: WithAuthProp<Request>, res: Response) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await users.getUser(req.auth?.userId);
  if (!user) {
    return res.status(404).json({ message: "can't find this user" });
  }
  const userId = user.id;
  const cart = await Cart.findOne({ userId: userId }).populate<
    Pick<PopulatedParent, "posts">
  >("posts");
  if (!cart) {
    return res.status(404).json({ message: "can't find this cart" });
  }
  const postsWithUser = await getPostsWithUser({
    posts: cart.posts as PostType[],
  });

  try {
    res.status(200).json({ data: {...cart, posts:postsWithUser} });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
// add a post to user's cart

export const addOrRemovePostCart = async (
  req: WithAuthProp<Request>,
  res: Response
) => {
  const postId = req.params.id;

  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await users.getUser(req.auth?.userId);
  if (!user) {
    return res.status(404).json({ message: "can't find this user" });
  }
  const post = await Post.findOne({ _id: postId, status: "available" });
  if (!post) {
    return res.status(404).json({ message: "can't find this post" });
  }

  let cart = await Cart.findOne({ userId: user.id });

  try {
    if (!cart) {
      const newCart = await Cart.create({
        userId: user.id,
        posts: [post._id],
        totalPrice: post.price,
      });
      return res.status(200).json({ message: "Post added to cart" });
    }

    const postIndex = cart.posts.indexOf(post._id);

    if (postIndex === -1) {
      cart.posts = [...cart.posts, post._id];
      cart.totalPrice += post.price;
      await cart.save();
      return res.status(200).json({ message: "Post added to cart" });
    }

    cart.posts.splice(postIndex, 1);
    if (cart.totalPrice) {
      cart.totalPrice -= post.price;
    }

    await cart.save();

    return res.status(200).json({ message: "Post removed from cart" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// clear user's cart

export const clearCart = async (req: WithAuthProp<Request>, res: Response) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await users.getUser(req.auth?.userId);
  if (!user) {
    return res.status(404).json({ message: "can't find this user" });
  }

  try {
    let cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.posts = [];
    cart.totalPrice = 0;
    await cart.save();
    return res.status(200).json({ message: "Cart cleared" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get user's cart total price
export const getCartTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart === null) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ totalPrice: cart.totalPrice });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
