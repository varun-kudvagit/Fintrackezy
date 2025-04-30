import express from "express";
import getUserInfoController from "../controllers/user.contoller.js";
const userRouter = express.Router();
userRouter.get("/", getUserInfoController);
export default userRouter;
