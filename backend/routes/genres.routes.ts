import express from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  deleteGenre,
  updateGenre,
} from "../controllers/Genre.controller";

const genreRouter = express.Router();

genreRouter.get("/", getAllGenres);
genreRouter.get("/:id", getGenreById);
genreRouter.post("/create", createGenre);
genreRouter.delete("/delete/:id", deleteGenre);
genreRouter.patch("/update/:id", updateGenre);

export { genreRouter };
