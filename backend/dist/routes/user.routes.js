"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("../controllers/User.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/profile/:createdBy", User_controller_1.getUserProfile);
//# sourceMappingURL=user.routes.js.map