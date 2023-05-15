import express from "express";
import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import "dotenv/config";

const app = express();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.listen(3000, () => {
  console.log(`app listening at http://localhost:3000`);
});
