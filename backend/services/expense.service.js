import ExpenseModel from "../models/expense.model.js";
export const addExpenseService = async (userId, body) => {
  let { icon, category, amount, date } = body;
  let newExpense = new ExpenseModel({
    userId,
    icon,
    category,
    amount,
    date: new Date(date),
  });
  await newExpense.save();
  return newExpense;
};
export const getAllExpensesService = async (userId) => {
  let expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
  return expenses;
};
export const deleteExpenseByIdService = async (expenseId) => {
  await ExpenseModel.findByIdAndDelete(expenseId);
};
