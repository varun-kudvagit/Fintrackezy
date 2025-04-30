import express from "express";
import {
  registerUserController,
  loginUserController,
  uploadImageController,
} from "../controllers/auth.controller.js";
import uploadHandler from "../middlewares/upload.middleware.js";
const authRouter = express.Router();
authRouter.post("/register", registerUserController);
authRouter.post(
  "/upload-image",
  uploadHandler.single("image"),
  uploadImageController
);
authRouter.post("/login", loginUserController);
export default authRouter;
