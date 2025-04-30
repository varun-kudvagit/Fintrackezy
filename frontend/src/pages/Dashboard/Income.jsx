// import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import {
  deleteIncomeFn,
  donwloadIncomeExcelSheetFn,
  getAllIncomesFn,
} from "../../apis/incomeApis";
import Modal from "../../components/modal/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import { toast } from "react-hot-toast";
import { addIncomeFn } from "../../apis/incomeApis";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/alerts/DeleteAlert";
import useAuthStore from "../../store/authStore";
import moment from "moment";

const Income = () => {
  const { user } = useAuthStore();
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: null,
    data: null,
  });

  const fetchAllIncomeDetails = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { incomes } = await getAllIncomesFn();
      if (incomes) {
        setIncomeData(incomes);
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date } = income;
    if (!source.trim()) {
      toast.error("Source is Required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number and greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try {
      await addIncomeFn(income);
      await fetchAllIncomeDetails();
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
    } catch (error) {
      console.error(
        "Error adding income: ",
        error?.response?.data?.message || error.message
      );
    }
  };

  const deleteIncome = async (id) => {
    try {
      await deleteIncomeFn(id);
      setOpenDeleteAlert({ show: false, data: null });
      await fetchAllIncomeDetails();
      toast.success("Income details deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting income: ",
        error?.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const blobData = await donwloadIncomeExcelSheetFn();
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `income_details-${user?.name}-${moment().format("DD/MM/YYYY")}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Unable to download: ",
        error?.response?.data?.message || error.message
      );
      toast.error("Failed to download expense details, try again...");
    }
  };
  useEffect(() => {
    fetchAllIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
