import express from "express";

const cartRouter = express.Router();

import {
  getCart,
  addPostToCart,
  removePostFromCart,
  clearCart,
  getCartTotalPrice,
  getCarts,
} from "../controllers/Cart.controller";

cartRouter.get("/:userId", getCart);
cartRouter.post("/:id", addPostToCart);
cartRouter.delete("/:id", removePostFromCart);
cartRouter.delete("/", clearCart);
cartRouter.get("/total-price", getCartTotalPrice);
cartRouter.get("/", getCarts);

export { cartRouter };
