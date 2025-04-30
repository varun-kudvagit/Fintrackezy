import UserModel from "../models/user.model.js";
import {
  BadRequestException,
  NotFoundException,
} from "../utils/appError.util.js";
export const registerUserService = async (body) => {
  let { email, name, password, profileImage } = body;
  let existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestException("Email already exists");
  }

  const user = new UserModel({ email, name, password, profileImage });
  await user.save();
  return user.omitPassword();
};
export const loginUserService = async (body) => {
  let { email, password } = body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    throw new NotFoundException("No account exists with this Email address");
  }
  // console.log('Loggedin user: ', user)
  let isValidPassword = await user.comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new BadRequestException("Invalid Password");
  }
  return user.omitPassword();
};
