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
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
cartRouter.get("/total-price", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Cart_controller_1.getCartTotalPrice);
cartRouter.get("/", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Cart_controller_1.getCart);
cartRouter.post("/:id", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Cart_controller_1.addOrRemovePostCart);
cartRouter.delete("/", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Cart_controller_1.clearCart);
//# sourceMappingURL=carts.routes.js.map