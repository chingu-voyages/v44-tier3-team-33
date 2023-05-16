import express from "express";
import {
  getAllGenres,
  getGenreById,
  deleteGenre,
  updateGenre,
} from "../controllers/Genre.controller";

const genreRouter = express.Router();

genreRouter.get("/", getAllGenres);
genreRouter.get("/:id", getGenreById);
genreRouter.delete("/delete/:id", deleteGenre);
genreRouter.patch("/update/:id", updateGenre);

export { genreRouter };
