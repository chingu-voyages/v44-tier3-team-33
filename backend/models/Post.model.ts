import mongoose from "mongoose";
import { BookConditionEnum } from "../types/post.types";

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  imgs: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genres: {
    type: [Schema.Types.ObjectId],
    ref: "Genre",
  },
  isbn: {
    type: String,
  },
  condition: {
    type: String,
    enum: BookConditionEnum,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
});

export const Post = mongoose.model("Post", PostSchema);
