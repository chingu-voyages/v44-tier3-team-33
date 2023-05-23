"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.PostSchema = new Schema({
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
exports.Post = mongoose_1.default.model("Post", exports.PostSchema);
//# sourceMappingURL=Post.model.js.map