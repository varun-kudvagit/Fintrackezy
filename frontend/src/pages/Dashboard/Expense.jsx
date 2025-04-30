import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllExpensesFn,
  addExpenseFn,
  deleteExpenseFn,
  donwloadExpenseExcelSheetFn,
} from "../../apis/expenseApis";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/modal/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import { toast } from "react-hot-toast";
import DeleteAlert from "../../components/alerts/DeleteAlert";
import ExpenseList from "../../components/expense/ExpenseList";
import useAuthStore from "../../store/authStore";
import moment from "moment";

const Expense = () => {
  const { user } = useAuthStore();
  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: null,
    data: null,
  });

  const fetchAllExpenseDetails = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { expenses } = await getAllExpensesFn();
      if (expenses) {
        setExpenseData(expenses);
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date } = expense;
    if (!category.trim()) {
      toast.error("Category is Required");
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
      await addExpenseFn(expense);
      await fetchAllExpenseDetails();
      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);
    } catch (error) {
      console.error(
        "Error adding expense: ",
        error?.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteExpenseFn(id);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      await fetchAllExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense: ",
        error?.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const blobData = await donwloadExpenseExcelSheetFn();
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `expense_details-${user?.name}-${moment().format("DD/MM/YYYY")}.xlsx`
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
    fetchAllExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
