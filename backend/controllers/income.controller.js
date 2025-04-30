import xlsx from "xlsx";
import HTTPSTATUS from "../constants/http.constant.js";
import {
  addIncomeService,
  getAllIncomesService,
  deleteIncomeByIdService,
} from "../services/income.service.js";
import { addIncomeSchema } from "../validation/income.validation.js";

export const addIncomeController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    addIncomeSchema.parse({ ...req.body, amount: Number(req.body.amount) });
    let newlyAddedIncome = await addIncomeService(userId, req.body);
    return res.status(HTTPSTATUS.CREATED).json({
      newlyAddedIncome,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getAllIncomesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let incomes = await getAllIncomesService(userId);
    return res.status(HTTPSTATUS.OK).json({
      incomes,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteIncomeController = async (req, res, next) => {
  try {
    let incomeId = req.params.id;
    await deleteIncomeByIdService(incomeId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const downloadInExcelController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const incomes = await getAllIncomesService(userId);
    const data = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    next(error);
  }
};
