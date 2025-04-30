import React from "react";
import CustomPieChart from "../charts/CustomPieChart";
// import { formatDecimalValueUptoTwoPlaces } from '../../utils/helpers'

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="text-lg">Financial Overview</div>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
