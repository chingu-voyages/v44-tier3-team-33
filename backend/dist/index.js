"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const index_routes_1 = require("./routes/index.routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(index_routes_1.router);
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map