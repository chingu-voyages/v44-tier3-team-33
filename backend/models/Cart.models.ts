import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});
