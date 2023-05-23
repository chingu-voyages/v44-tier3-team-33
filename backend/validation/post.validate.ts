import { z } from "zod";
import { BookConditionEnum, BookGenreEnum } from "../types/post.types";

export const createPostSchema = z.object({
  body: z.object({
    post: z.object({
      title: z.string().min(1, { message: "Title is required" }),
      author: z.string().min(1, { message: "Author is required" }),
      description: z
        .string()
        .min(5, { message: "short description min 5" })
        .max(300),
      condition: z.enum(BookConditionEnum),
      price: z.number().min(1, { message: "Price is required" }),
      genre: z
        .enum(BookGenreEnum)
        .array()
        .min(1, { message: "Genre is required" }),
      imagesURLs: z.string().url().array().min(1).max(4),
    }),
  }),
});
export type CreatePostType = z.infer<typeof createPostSchema>;
