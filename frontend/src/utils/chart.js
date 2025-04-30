import moment from "moment";
export const prepareExpenseBarChartData = (data) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD/MM/YYYY"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD/MM/YYYY"),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};
