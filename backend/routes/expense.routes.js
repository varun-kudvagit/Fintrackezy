import express from "express";
const expenseRouter = express.Router();
import {
  addExpenseController,
  getAllExpensesController,
  deleteExpenseController,
  downloadInExcelController,
} from "../controllers/expense.controller.js";
expenseRouter.post("/add", addExpenseController);
expenseRouter.get("/all", getAllExpensesController);
expenseRouter.delete("/:id/delete", deleteExpenseController);
expenseRouter.get("/download-excel", downloadInExcelController);
export default expenseRouter;
