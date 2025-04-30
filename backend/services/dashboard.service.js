import IncomeModel from "../models/income.model.js";
import ExpenseModel from "../models/expense.model.js";
export const getTotalIncomeForDashboardService = async (userId) => {
  let totalIncome = await IncomeModel.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return totalIncome;
};
export const getTotalExpenseForDashboardService = async (userId) => {
  let totalExpense = await ExpenseModel.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return totalExpense;
};
export const last30DaysIncomeAnalyticsService = async (userId) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const last30DaysIncomeTransactions = await IncomeModel.find({
    userId,
    date: { $gte: thirtyDaysAgo },
  }).sort({ date: -1 });
  const totalIncomeInLast30Days = last30DaysIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  return { last30DaysIncomeTransactions, totalIncomeInLast30Days };
};
export const last30DaysExpenseAnalyticsService = async (userId) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const last30DaysExpenseTransactions = await ExpenseModel.find({
    userId,
    date: { $gte: thirtyDaysAgo },
  }).sort({ date: -1 });
  const totalExpenseInLast30Days = last30DaysExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  return { last30DaysExpenseTransactions, totalExpenseInLast30Days };
};
export const getFiveMostRecentTransactionsService = async (userId) => {
  const recentIncomes = await IncomeModel.find({ userId })
    .sort({ date: -1 })
    .limit(5)
    .lean(); // Convert Mongoose documents to plain objects

  const recentExpenses = await ExpenseModel.find({ userId })
    .sort({ date: -1 })
    .limit(5)
    .lean();

  const fiveMostRecentTransactions = [
    ...recentIncomes.map((transaction) => ({ ...transaction, type: "income" })),
    ...recentExpenses.map((transaction) => ({
      ...transaction,
      type: "expense",
    })),
  ];

  fiveMostRecentTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return fiveMostRecentTransactions;
};
