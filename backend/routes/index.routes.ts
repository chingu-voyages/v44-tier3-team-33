import express from "express";
import { postRouter } from "./posts.routes";
import { genreRouter } from "./genres.routes";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/genres", genreRouter);

export { router };
