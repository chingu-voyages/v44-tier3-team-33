import mongoose, { Types } from "mongoose";
import { Cart } from "../models/Cart.models";
import { users } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";
import { Post } from "../models/Post.model";

// Get all carts
export const getCart = async (req: Request, res: Response) => {
  const user = await users.getUser(req.params.userId);
  try {
    const carts = await Cart.find({ userId: user.id }).populate("posts");
    res.status(200).json(carts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
// add a post to user's cart

export const addPostToCart = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    // check if post exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    // check if user's cart exists
    let cart = await Cart.findOne({ userId: userId });
    // if cart exists, check if post is already in cart or not
    if (cart !== null) {
      // list of post ids in cart
      const postsIds: Types.ObjectId[] = cart.posts.map(
        (postId: Types.ObjectId) => postId
      );
      const postId = new Types.ObjectId(id);
      // if post is already in cart, return message
      if (postsIds.includes(postId)) {
        return res.status(200).json({ message: "Post already in cart" });
      } else {
        cart.posts.push(postId);
        // update cart total price
        const post = await Post.findById(id);
        // check if post price is a number and not undefined
        if (post && post.price !== undefined) {
          cart.totalPrice = cart.totalPrice ?? 0; // if cart.totalPrice is undefined, set it to 0
          cart.totalPrice += post.price;
        }
        await cart.save();
        return res.status(200).json({ message: "Post added to cart" });
      }
    } else {
      const post = await Post.findById(id);
      const newCart = await Cart.create({
        userId: userId,
        posts: [id.toString()],
        totalPrice: post && post.price !== undefined ? post.price : 0, // Initialize totalPrice with post price or 0 if not available
      });
      await newCart.save(); // Save the new cart to the database
      return res.status(200).json({ message: "Post added to cart" });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// remove a post from user's cart
export const removePostFromCart = async (req: Request, res: Response) => {
  const id = req.params.id; // post id
  const { userId } = req.body;
  try {
    // check if post exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    // find the user's cart
    let cart = await Cart.findOne({ userId: userId });

    // if cart doesn't exist, return message
    if (cart === null) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // check if post is in the cart
    const postId = new Types.ObjectId(id);
    const postIndex = cart.posts.indexOf(postId);

    // if post is not in the cart, return message
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found in cart" });
    }

    // remove the post from the cart
    cart.posts.splice(postIndex, 1);

    // update cart total price
    const post = await Post.findById(id);

    // check if post price is a number and not undefined
    if (post && post.price !== undefined) {
      cart.totalPrice = cart.totalPrice ?? 0; // if cart.totalPrice is undefined, set it to 0
      cart.totalPrice -= post.price;
    }

    // save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Post removed from cart" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// clear user's cart

export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart === null) {
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
