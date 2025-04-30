import IncomeModel from "../models/income.model.js";
export const addIncomeService = async (userId, body) => {
  let { icon, source, amount, date } = body;
  let newIncome = new IncomeModel({
    userId,
    icon,
    source,
    amount,
    date: new Date(date),
  });
  await newIncome.save();
  return newIncome;
};
export const getAllIncomesService = async (userId) => {
  let incomes = await IncomeModel.find({ userId }).sort({ date: -1 });
  return incomes;
};
export const deleteIncomeByIdService = async (incomeId) => {
  await IncomeModel.findByIdAndDelete(incomeId);
};
