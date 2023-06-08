"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_controller_1 = require("../controllers/Post.controller");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const validateReq_1 = __importDefault(require("../middleware/validateReq"));
const post_validate_1 = require("../validation/post.validate");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.post("/buy");
postRouter.post("/filters", Post_controller_1.getPostsByFilters);
postRouter.get("/:searchQuery", Post_controller_1.getPostsBySearch);
postRouter.get("/user/:id", Post_controller_1.getPostsByUserId);
postRouter.get("/post/:id", Post_controller_1.getPostById);
postRouter.get("/", Post_controller_1.getAvailablePosts); // this is what should be used in the discover page
postRouter.get("/available/:id", Post_controller_1.getAvailablePostsByUserId);
postRouter.get("/availablePost/:id", Post_controller_1.getAvailablePostByUser);
postRouter.get("/sold/:id", Post_controller_1.getSoldPostsByUserId);
postRouter.get("/price/:price", Post_controller_1.getPostsByPrice);
postRouter.get("/genre/:id", Post_controller_1.getPostsByGenre);
postRouter.get("/genre/:id", Post_controller_1.getPostsByGenre);
postRouter.get("/all", Post_controller_1.getAllPosts);
postRouter.post("/create", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), (0, validateReq_1.default)(post_validate_1.createPostSchema), Post_controller_1.createPost);
postRouter.put("/update/:id", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Post_controller_1.updatePost);
postRouter.put("/updateStatus/:id", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Post_controller_1.updatePostStatus);
postRouter.delete("/delete/:id", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Post_controller_1.deletePost);
postRouter.put("/addFavorites/:id", (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), Post_controller_1.addPostToFavorites);
//# sourceMappingURL=posts.routes.js.map