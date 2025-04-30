import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    icon: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const ExpenseModel =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default ExpenseModel;
