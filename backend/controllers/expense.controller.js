import xlsx from "xlsx";
import HTTPSTATUS from "../constants/http.constant.js";
import {
  addExpenseService,
  getAllExpensesService,
  deleteExpenseByIdService,
} from "../services/expense.service.js";
import { addExpenseSchema } from "../validation/expense.valiadtion.js";
export const addExpenseController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    addExpenseSchema.parse({ ...req.body, amount: Number(req.body.amount) });
    let newlyAddedExpense = await addExpenseService(userId, req.body);
    return res.status(HTTPSTATUS.CREATED).json({
      newlyAddedExpense,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllExpensesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let expenses = await getAllExpensesService(userId);
    return res.status(HTTPSTATUS.OK).json({
      expenses,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteExpenseController = async (req, res, next) => {
  try {
    let expenseId = req.params.id;
    await deleteExpenseByIdService(expenseId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const downloadInExcelController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expenses = await getAllExpensesService(userId);
    const data = expenses.map((expense) => ({
      Source: expense.source,
      Amount: expense.amount,
      Date: expense.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    next(error);
  }
};
