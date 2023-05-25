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

cartRouter.get("/total-price", ClerkExpressWithAuth(), getCartTotalPrice);
cartRouter.get("/", ClerkExpressWithAuth(), getCart);
cartRouter.post("/:id", ClerkExpressWithAuth(), addOrRemovePostCart);
cartRouter.delete("/", ClerkExpressWithAuth(), clearCart);

export { cartRouter };
