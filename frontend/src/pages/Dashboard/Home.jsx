import React, { useEffect, useState } from "react";
// import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { getDashboardDataFn } from "../../apis/dashboardApis";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import {
  addThousandsSeperator,
  formatDecimalValueUptoTwoPlaces,
} from "../../utils/helpers";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDashboardData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const data = await getDashboardDataFn();
      if (data) {
        // console.log(data);
        setDashboardData(data);
      }
    } catch (error) {
      console.log("Something went wrong, Please try again: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  // console.log(dashboardData);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Top Infocards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("expense")}
          />

          <FinanceOverview
            totalBalance={
              formatDecimalValueUptoTwoPlaces(dashboardData?.totalBalance) || 0
            }
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses.transactions}
            onSeeMore={() => navigate("expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses.transactions || []}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last30DaysIncomes?.transactions?.slice(0, 3) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last30DaysIncomes?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
