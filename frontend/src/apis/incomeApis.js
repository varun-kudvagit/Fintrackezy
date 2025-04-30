import { API_PATHS } from "../utils/apiPaths";
import API from "../utils/axiosInstance";
export const getAllIncomesFn = async () => {
  const response = await API.get(API_PATHS.INCOME.GET_ALL_INCOME);
  // console.log(response.data);
  return response.data;
};

export const addIncomeFn = async (income) => {
  // const response =
  await API.post(API_PATHS.INCOME.ADD_INCOME, income);
  // console.log(response.data);
};

export const deleteIncomeFn = async (id) => {
  // const response =
  await API.delete(API_PATHS.INCOME.DELETE_INCOME(id));
  // console.log(response.data);
};

export const donwloadIncomeExcelSheetFn = async () => {
  const response = await API.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
    responseType: "blob",
  });
  return response.data;
};
