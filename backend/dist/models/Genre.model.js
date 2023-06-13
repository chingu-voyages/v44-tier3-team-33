"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = exports.GenreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_types_1 = require("../types/post.types");
const Schema = mongoose_1.default.Schema;
exports.GenreSchema = new Schema({
    genreName: {
        type: String,
        enum: post_types_1.BookGenreEnum,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});
exports.Genre = mongoose_1.default.model("Genre", exports.GenreSchema);
//# sourceMappingURL=Genre.model.js.map