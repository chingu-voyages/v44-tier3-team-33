import express from "express";
import { postRouter } from "./posts.routes";
import { genreRouter } from "./genres.routes";
import { cartRouter } from "./carts.routes";
import { userRouter } from "./user.routes";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/genres", genreRouter);
router.use("/carts", cartRouter);
router.use("/users", userRouter)

export { router };
