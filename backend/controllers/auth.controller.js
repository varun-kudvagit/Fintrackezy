import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import HTTPSTATUS from "../constants/http.constant.js";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import { BadRequestException } from "../utils/appError.util.js";
const generateToken = (id) =>
  jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "1d" });

export const registerUserController = async (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    let createdUser = await registerUserService(req.body);
    return res.status(HTTPSTATUS.CREATED).json({
      id: createdUser._id,
      user: createdUser,
      token: generateToken(createdUser._id),
    });
  } catch (error) {
    next(error);
  }
};
export const uploadImageController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestException("No Image File");
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    return res.status(HTTPSTATUS.CREATED).json({
      imageUrl,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUserController = async (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    let user = await loginUserService(req.body);
    return res.status(HTTPSTATUS.OK).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
