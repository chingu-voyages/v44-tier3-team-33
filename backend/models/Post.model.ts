import mongoose from "mongoose";
import { BookConditionEnum, BookStatusEnum } from "../types/post.types";

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
    indexedDB: true,
  },
  imgs: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
    indexedDB: true,
  },
  title: {
    type: String,
    required: true,
    indexedDB: true,
  },
  genres: {
    type: [Schema.Types.ObjectId],
    ref: "Genre",
    indexedDB: true,
  },
  isbn: {
    type: String,
  },
  condition: {
    type: String,
    enum: BookConditionEnum,
    required: true,
    indexedDB: true,
  },
  price: {
    type: Number,
    required: true,
    indexedDB: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    indexedDB: true,
  },
  status: {
    type: String,
    enum: BookStatusEnum,
    default: BookStatusEnum[0],
    indexedDB: true,
  },
});

export const Post = mongoose.model("Post", PostSchema);
