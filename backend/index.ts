import express from "express";
import mongoose from "mongoose";
import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import "dotenv/config";
import { router } from "./routes/index.routes";

const app = express();
const port = process.env.PORT || 3001;
declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
