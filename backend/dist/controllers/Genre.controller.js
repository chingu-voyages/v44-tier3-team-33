"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenreById = exports.getAllGenres = void 0;
const Genre_model_1 = require("../models/Genre.model");
const mongoose_1 = __importDefault(require("mongoose"));
//get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre_model_1.Genre.find().populate("posts");
        res.status(200).json(genres);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getAllGenres = getAllGenres;
//get genre by id
const getGenreById = async (req, res) => {
    const genre = await Genre_model_1.Genre.findById(req.params.id);
    try {
        res.status(200).json(genre);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getGenreById = getGenreById;
//create genre
const createGenre = async (req, res) => {
    const genre = req.body;
    const newGenre = new Genre_model_1.Genre(genre);
    try {
        await newGenre.save();
        res.status(201).json(newGenre);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.createGenre = createGenre;
//update genre
const updateGenre = async (req, res) => {
    const id = req.params.id;
    const genre = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send(`No genre with id: ${id}`);
    try {
        const updatedGenre = await Genre_model_1.Genre.findByIdAndUpdate(id, genre, {
            new: true,
        });
        res.status(201).json(updatedGenre);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.updateGenre = updateGenre;
//delete genre
const deleteGenre = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send(`No genre with id: ${id}`);
    try {
        await Genre_model_1.Genre.findByIdAndRemove(id);
        res.status(201).json({ message: "Genre deleted successfully" });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.deleteGenre = deleteGenre;
// TODO: get all posts by genre
//# sourceMappingURL=Genre.controller.js.map