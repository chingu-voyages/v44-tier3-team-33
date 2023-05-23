"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const zod_1 = require("zod");
const post_types_1 = require("../types/post.types");
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        post: zod_1.z.object({
            title: zod_1.z.string().min(1, { message: "Title is required" }),
            author: zod_1.z.string().min(1, { message: "Author is required" }),
            description: zod_1.z
                .string()
                .min(5, { message: "short description min 5" })
                .max(300),
            condition: zod_1.z.enum(post_types_1.BookConditionEnum),
            price: zod_1.z.number().min(1, { message: "Price is required" }),
            genre: zod_1.z
                .enum(post_types_1.BookGenreEnum)
                .array()
                .min(1, { message: "Genre is required" }),
            imagesURLs: zod_1.z.string().url().array().min(1).max(4),
        }),
    }),
});
//# sourceMappingURL=post.validate.js.map