import { API_PATHS } from "../utils/apiPaths";
import API from "../utils/axiosInstance";

export const getAllExpensesFn = async () => {
  const response = await API.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
  // console.log(response.data);
  return response.data;
};

export const addExpenseFn = async (expense) => {
  // const response =
  await API.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
  // console.log(response.data);
};

export const deleteExpenseFn = async (id) => {
  // const response =
  await API.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
  // console.log(response.data);
};

export const donwloadExpenseExcelSheetFn = async () => {
  const response = await API.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
    responseType: "blob",
  });
  return response.data;
};
