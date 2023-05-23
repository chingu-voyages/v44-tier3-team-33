"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cartRouter = express_1.default.Router();
exports.cartRouter = cartRouter;
const Cart_controller_1 = require("../controllers/Cart.controller");
cartRouter.get("/:userId", Cart_controller_1.getCart);
cartRouter.post("/:id", Cart_controller_1.addPostToCart);
cartRouter.delete("/:id", Cart_controller_1.removePostFromCart);
cartRouter.delete("/", Cart_controller_1.clearCart);
cartRouter.get("/total-price", Cart_controller_1.getCartTotalPrice);
cartRouter.get("/", Cart_controller_1.getCarts);
//# sourceMappingURL=carts.routes.js.map