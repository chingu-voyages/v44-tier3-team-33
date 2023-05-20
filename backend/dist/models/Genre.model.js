"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = exports.GenreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.GenreSchema = new Schema({
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
exports.Genre = mongoose_1.default.model("Genre", exports.GenreSchema);
//# sourceMappingURL=Genre.model.js.map