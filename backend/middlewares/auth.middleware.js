import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import UserModel from "../models/user.model.js";
import {
  UnauthorizedException,
  BadRequestException,
} from "../utils/appError.util.js";
const isAuthenticated = async (req, _, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(
      new UnauthorizedException(
        "Bearer Token Unavailable, Authorization Failed ❌"
      )
    );
  }
  try {
    let decodedData = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
    req.user = await UserModel.findById(decodedData.id).select("-password");
    // console.log(req.user);
    next();
  } catch (error) {
    return next(
      new BadRequestException("Login Invalidated, Token not verified")
    );
  }
};
export default isAuthenticated;
