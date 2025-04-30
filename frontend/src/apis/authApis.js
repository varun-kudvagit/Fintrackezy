import { API_PATHS } from "../utils/apiPaths";
import API from "../utils/axiosInstance";
export const loginUserFn = async (email, password) => {
  const response = await API.post(API_PATHS.AUTH.LOGIN, {
    email,
    password,
  });
  return response.data;
};
export const registerUserFn = async (
  name,
  email,
  password
  // profileImage=undefined
) => {
  const response = await API.post(API_PATHS.AUTH.REGISTER, {
    name,
    email,
    password,
    // ...(profileImage && { profileImage }),
  });
  return response.data;
};
