"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartTotalPrice = exports.clearCart = exports.removePostFromCart = exports.addPostToCart = exports.getCart = exports.getCarts = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Cart_models_1 = require("../models/Cart.models");
const Post_model_1 = require("../models/Post.model");
//Get all carts just for testing
const getCarts = async (req, res) => {
    try {
        const carts = await Cart_models_1.Cart.find();
        res.status(200).json(carts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getCarts = getCarts;
// Get all carts
const getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const carts = await Cart_models_1.Cart.find({ userId: userId }).populate("posts");
        res.status(200).json(carts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getCart = getCart;
// add a post to user's cart
const addPostToCart = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        // check if post exists
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            return res.status(404).send(`No post with id: ${id}`);
        // check if user's cart exists
        let cart = await Cart_models_1.Cart.findOne({ userId: userId });
        // if cart exists, check if post is already in cart or not
        if (cart !== null) {
            // list of post ids in cart
            const postsIds = cart.posts.map((postId) => postId);
            const postId = new mongoose_1.Types.ObjectId(id);
            // if post is already in cart, return message
            if (postsIds.includes(postId)) {
                return res.status(200).json({ message: "Post already in cart" });
            }
            else {
                cart.posts.push(postId);
                // update cart total price
                const post = await Post_model_1.Post.findById(id);
                // check if post price is a number and not undefined
                if (post && post.price !== undefined) {
                    cart.totalPrice = cart.totalPrice ?? 0; // if cart.totalPrice is undefined, set it to 0
                    cart.totalPrice += post.price;
                }
                await cart.save();
                return res.status(200).json({ message: "Post added to cart" });
            }
        }
        else {
            const post = await Post_model_1.Post.findById(id);
            const newCart = await Cart_models_1.Cart.create({
                userId: userId,
                posts: [id.toString()],
                totalPrice: post && post.price !== undefined ? post.price : 0, // Initialize totalPrice with post price or 0 if not available
            });
            await newCart.save(); // Save the new cart to the database
            return res.status(200).json({ message: "Post added to cart" });
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.addPostToCart = addPostToCart;
// remove a post from user's cart
const removePostFromCart = async (req, res) => {
    const id = req.params.id; // post id
    const { userId } = req.body;
    try {
        // check if post exists
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            return res.status(404).send(`No post with id: ${id}`);
        // find the user's cart
        let cart = await Cart_models_1.Cart.findOne({ userId: userId });
        // if cart doesn't exist, return message
        if (cart === null) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // check if post is in the cart
        const postId = new mongoose_1.Types.ObjectId(id);
        const postIndex = cart.posts.indexOf(postId);
        // if post is not in the cart, return message
        if (postIndex === -1) {
            return res.status(404).json({ message: "Post not found in cart" });
        }
        // remove the post from the cart
        cart.posts.splice(postIndex, 1);
        // update cart total price
        const post = await Post_model_1.Post.findById(id);
        // check if post price is a number and not undefined
        if (post && post.price !== undefined) {
            cart.totalPrice = cart.totalPrice ?? 0; // if cart.totalPrice is undefined, set it to 0
            cart.totalPrice -= post.price;
        }
        // save the updated cart
        await cart.save();
        return res.status(200).json({ message: "Post removed from cart" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removePostFromCart = removePostFromCart;
// clear user's cart
const clearCart = async (req, res) => {
    const { userId } = req.body;
    try {
        let cart = await Cart_models_1.Cart.findOne({ userId: userId });
        if (cart === null) {
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