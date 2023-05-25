import express from "express";
import {
  getAllGenres,
  getGenreById,
  updateGenre,
} from "../controllers/Genre.controller";

const genreRouter = express.Router();

genreRouter.get("/", getAllGenres);
genreRouter.get("/:id", getGenreById);
genreRouter.patch("/update/:id", updateGenre);

export { genreRouter };
