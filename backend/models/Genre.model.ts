import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GenreSchema = new Schema({
  genreName: {
    type: String,
    enum: [
      "Action and Adventure",
      "Classics",
      "Contemporary Fiction",
      "Detective and Mystery",
      "Fantasy",
      "Historical Fiction",
      "Horror",
      "Romance",
      "Science Fiction",
      "Thriller",
      "Biography and Autobiography",
      "Business and Economics",
      "Cookbooks",
      "Education",
      "History",
      "Humor",
      "Literary Criticism",
      "Memoir",
      "Natural History",
      "Philosophy",
      "Religion",
      "Self-Help",
      "Science",
      "Technology",
    ],
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
