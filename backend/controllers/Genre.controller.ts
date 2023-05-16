import { Genre } from "../models/Genre.model";
import mongoose from "mongoose";
import { Request, Response } from "express";
//get all genres
export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find().populate("posts");
    res.status(200).json(genres);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//get genre by id
export const getGenreById = async (req: Request, res: Response) => {
  const genre = await Genre.findById(req.params.id);
  try {
    res.status(200).json(genre);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

//create genre
export const createGenre = async (req: Request, res: Response) => {
  const genre = req.body;
  const newGenre = new Genre(genre);
  try {
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

//update genre
export const updateGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const genre = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No genre with id: ${id}`);
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(id, genre, {
      new: true,
    });
    res.status(201).json(updatedGenre);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

//delete genre
export const deleteGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No genre with id: ${id}`);
  try {
    await Genre.findByIdAndRemove(id);
    res.status(201).json({ message: "Genre deleted successfully" });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

// TODO: get all posts by genre
