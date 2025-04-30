import { z } from "zod";
import { iconSchema, amountSchema, dateSchema } from "./income.validation.js";

const categorySchema = z
  .string()
  .trim()
  .min(1, "Expense Category can't be empty");

export const addExpenseSchema = z.object({
  icon: iconSchema,
  category: categorySchema,
  amount: amountSchema,
  date: dateSchema,
});
