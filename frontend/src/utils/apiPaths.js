export const API_PATHS = {
  AUTH: {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    UPLOAD_IMAGE: "/v1/auth/upload-image",
  },
  USER: {
    GET_USER_INFO: "/v1/user",
  },
  DASHBOARD: {
    GET_DATA: "/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/v1/income/add",
    GET_ALL_INCOME: "/v1/income/all",
    DELETE_INCOME: (incomeId) => `/v1/income/${incomeId}/delete`,
    DOWNLOAD_INCOME: "/v1/income/download-excel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/v1/expense/add",
    GET_ALL_EXPENSE: "/v1/expense/all",
    DELETE_EXPENSE: (expenseId) => `/v1/expense/${expenseId}/delete`,
    DOWNLOAD_EXPENSE: "/v1/expense/download-excel",
  },
};
