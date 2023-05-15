import express from "express";
import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;
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

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
