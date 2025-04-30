import express from "express";
const incomeRouter = express.Router();
import {
  addIncomeController,
  getAllIncomesController,
  deleteIncomeController,
  downloadInExcelController,
} from "../controllers/income.controller.js";
incomeRouter.post("/add", addIncomeController);
incomeRouter.get("/all", getAllIncomesController);
incomeRouter.delete("/:id/delete", deleteIncomeController);
incomeRouter.get("/download-excel", downloadInExcelController);
export default incomeRouter;
