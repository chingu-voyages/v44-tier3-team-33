import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: "Genre",
  },
  isbn: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["poor", "good", "very good", "like new"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdDate: {
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
