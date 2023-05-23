"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_controller_1 = require("../controllers/Post.controller");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.get("/:id", Post_controller_1.getPostsByUserId);
postRouter.get("/post/:id", Post_controller_1.getPostById);
postRouter.get("/", Post_controller_1.getAvailablePosts); // this is what should be used in the discover page
postRouter.get("/available/:id", Post_controller_1.getAvailablePostsByUserId);
postRouter.get("/sold/:id", Post_controller_1.getSoldPostsByUserId);
postRouter.get("/price/:price", Post_controller_1.getPostsByPrice);
postRouter.get("/genre/:genre", Post_controller_1.getPostsByGenre);
postRouter.get("/all", Post_controller_1.getAllPosts);
postRouter.post("/create", Post_controller_1.createPost);
postRouter.put("/update/:id", Post_controller_1.updatePost);
postRouter.put("/updateStatus/:id", Post_controller_1.updatePostStatus);
postRouter.delete("/delete/:id", Post_controller_1.deletePost);
postRouter.put("/addFavourite/:id", Post_controller_1.addPostToFavourites);
//# sourceMappingURL=posts.routes.js.map