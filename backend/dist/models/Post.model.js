"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_types_1 = require("../types/post.types");
const Schema = mongoose_1.default.Schema;
exports.PostSchema = new Schema({
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
        enum: post_types_1.BookConditionEnum,
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
        enum: post_types_1.BookStatusEnum,
        default: post_types_1.BookStatusEnum[0],
        indexedDB: true,
    },
    boughtBy: {
        type: String,
        required: false,
        indexedDB: true,
        default: "",
    },
});
exports.Post = mongoose_1.default.model("Post", exports.PostSchema);
//# sourceMappingURL=Post.model.js.map