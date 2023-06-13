"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartTotalPrice = exports.clearCart = exports.addOrRemovePostCart = exports.getCart = exports.getCarts = void 0;
const Cart_models_1 = require("../models/Cart.models");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const Post_model_1 = require("../models/Post.model");
const utils_1 = require("../utils/utils");
const getCarts = async (req, res) => {
    try {
        const carts = await Cart_models_1.Cart.find();
        res.status(200).json({ data: carts });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getCarts = getCarts;
// Get all carts
const getCart = async (req, res) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await clerk_sdk_node_1.users.getUser(req.auth?.userId);
    if (!user) {
        return res.status(404).json({ message: "can't find this user" });
    }
    const userId = user.id;
    console.log(userId);
    const cart = await Cart_models_1.Cart.findOne({ userId: userId }).populate("posts");
    if (!cart) {
        return res.status(404).json({ message: "can't find this cart" });
    }
    try {
        const postsWithUser = await (0, utils_1.getPostsWithUser)({
            posts: cart.posts,
        });
        res.status(200).json({
            data: {
                _id: cart._id,
                userId: cart.userId,
                posts: postsWithUser,
                totalPrice: cart.totalPrice,
            },
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getCart = getCart;
// add a post to user's cart
const addOrRemovePostCart = async (req, res) => {
    const postId = req.params.id;
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await clerk_sdk_node_1.users.getUser(req.auth?.userId);
    if (!user) {
        return res.status(404).json({ message: "can't find this user" });
    }
    const post = await Post_model_1.Post.findOne({ _id: postId, status: "available" });
    if (!post) {
        return res.status(404).json({ message: "can't find this post" });
    }
    let cart = await Cart_models_1.Cart.findOne({ userId: user.id });
    try {
        if (!cart) {
            const newCart = await Cart_models_1.Cart.create({
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
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.addOrRemovePostCart = addOrRemovePostCart;
// clear user's cart
const clearCart = async (req, res) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await clerk_sdk_node_1.users.getUser(req.auth?.userId);
    if (!user) {
        return res.status(404).json({ message: "can't find this user" });
    }
    try {
        let cart = await Cart_models_1.Cart.findOne({ userId: user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.posts = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json({ message: "Cart cleared" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.clearCart = clearCart;
// get user's cart total price
const getCartTotalPrice = async (req, res) => {
    const { userId } = req.body;
    try {
        let cart = await Cart_models_1.Cart.findOne({ userId: userId });
        if (cart === null) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ totalPrice: cart.totalPrice });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCartTotalPrice = getCartTotalPrice;
//# sourceMappingURL=Cart.controller.js.map