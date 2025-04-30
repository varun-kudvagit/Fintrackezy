import { API_PATHS } from "../utils/apiPaths";
import API from "../utils/axiosInstance";
export const getUserInfoFn = async () => {
  const response = await API.get(API_PATHS.USER.GET_USER_INFO);
  // console.log(response.data);
  return response.data;
};
