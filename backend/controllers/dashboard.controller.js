import { Types } from "mongoose";
import {
  getTotalIncomeForDashboardService,
  getTotalExpenseForDashboardService,
  last30DaysIncomeAnalyticsService,
  last30DaysExpenseAnalyticsService,
  getFiveMostRecentTransactionsService,
} from "../services/dashboard.service.js";
import HTTPSTATUS from "../constants/http.constant.js";
export const getDashboardDataController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    let totalIncome = await getTotalIncomeForDashboardService(userObjectId);
    let totalExpense = await getTotalExpenseForDashboardService(userObjectId);
    let { last30DaysIncomeTransactions, totalIncomeInLast30Days } =
      await last30DaysIncomeAnalyticsService(userId);
    let { last30DaysExpenseTransactions, totalExpenseInLast30Days } =
      await last30DaysExpenseAnalyticsService(userId);
    let lastFiveTransactions = await getFiveMostRecentTransactionsService(
      userId
    );
    return res.status(HTTPSTATUS.OK).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: totalExpenseInLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last30DaysIncomes: {
        total: totalIncomeInLast30Days,
        transactions: last30DaysIncomeTransactions,
      },
      recentTransactions: lastFiveTransactions,
    });
  } catch (error) {
    next(error);
  }
};
