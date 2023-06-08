import express from "express"
import { getUserProfile } from "../controllers/User.controller";

const userRouter = express.Router();

userRouter.get("/profile/:createdBy", getUserProfile)

export {userRouter}