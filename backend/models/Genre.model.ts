import mongoose from "mongoose";
import { BookGenreEnum } from "../types/post.types";

const Schema = mongoose.Schema;

export const GenreSchema = new Schema({
  genreName: {
    type: String,
    enum: BookGenreEnum,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export const Genre = mongoose.model("Genre", GenreSchema);
