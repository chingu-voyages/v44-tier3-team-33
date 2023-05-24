"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const posts_routes_1 = require("./posts.routes");
const genres_routes_1 = require("./genres.routes");
const carts_routes_1 = require("./carts.routes");
const router = express_1.default.Router();
exports.router = router;
router.use("/posts", posts_routes_1.postRouter);
router.use("/genres", genres_routes_1.genreRouter);
router.use("/carts", carts_routes_1.cartRouter);
//# sourceMappingURL=index.routes.js.map