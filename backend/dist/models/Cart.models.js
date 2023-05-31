"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.CartSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.CartSchema = new Schema({
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
        default: 0,
    },
});
exports.Cart = mongoose_1.default.model("Cart", exports.CartSchema);
//# sourceMappingURL=Cart.models.js.map