import express from "express";

const cartRouter = express.Router();

import {
  getCart,
  addOrRemovePostCart,
  clearCart,
  getCartTotalPrice,
  getCarts,
} from "../controllers/Cart.controller";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

cartRouter.get("/:userId", ClerkExpressWithAuth(), getCart);
cartRouter.post("/:id", ClerkExpressWithAuth(), addOrRemovePostCart);
cartRouter.delete("/", ClerkExpressWithAuth(), clearCart);
cartRouter.get("/total-price", ClerkExpressWithAuth(), getCartTotalPrice);

export { cartRouter };
