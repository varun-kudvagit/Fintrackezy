import UserModel from "../models/user.model.js";
import { NotFoundException } from "../utils/appError.util.js";
const getUserByIdService = async (userId) => {
  let user = await UserModel.findById(userId).select("-password");
  if (!user) {
    throw new NotFoundException("User Not Found");
  }
  return user;
};
export default getUserByIdService;
