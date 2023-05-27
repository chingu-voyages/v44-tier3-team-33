"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = void 0;
const express_1 = __importDefault(require("express"));
const Genre_controller_1 = require("../controllers/Genre.controller");
const genreRouter = express_1.default.Router();
exports.genreRouter = genreRouter;
genreRouter.get("/", Genre_controller_1.getAllGenres);
genreRouter.get("/:id", Genre_controller_1.getGenreById);
genreRouter.patch("/update/:id", Genre_controller_1.updateGenre);
//# sourceMappingURL=genres.routes.js.map