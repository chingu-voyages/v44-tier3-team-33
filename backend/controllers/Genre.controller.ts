import { Genre } from "../models/Genre.model";
import mongoose from "mongoose";
//get all genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get genre by id
export const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  try {
    res.status(200).json(genre);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create genre
export const createGenre = async (req, res) => {
  const genre = req.body;
  const newGenre = new Genre(genre);
  try {
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update genre
export const updateGenre = async (req, res) => {
  const id = req.params;
  const genre = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No genre with id: ${id}`);
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(id, genre, {
      new: true,
    });
    res.status(201).json(updatedGenre);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//delete genre
export const deleteGenre = async (req, res) => {
  const id = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No genre with id: ${id}`);
  try {
    await Genre.findByIdAndRemove(id);
    res.status(201).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// TODO: get all posts by genre
