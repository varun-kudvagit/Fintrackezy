import { API_PATHS } from "../utils/apiPaths";
import API from "../utils/axiosInstance";
export const getDashboardDataFn = async () => {
  const response = await API.get(API_PATHS.DASHBOARD.GET_DATA);
  // console.log(response.data);
  return response.data;
};
