import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";

import "../styles/Report.css";
import NoTransactions from "../components/notransaction";


import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(
  ArcElement,      // necessario per grafici a torta
  Tooltip,
  Legend,
  CategoryScale,   // necessario per grafici a barre
  LinearScale,     // necessario per grafici a barre
  BarElement       // necessario per grafici a barre
);

function Report() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((tx) => tx.date.startsWith(selectedMonth));
    setFilteredTransactions(filtered);

    let income = 0, expense = 0;
    let categoryBreakdown = {};

    filtered.forEach((tx) => {
      if (tx.type === "Income") {
        income += tx.amount;
      } else {
        expense += tx.amount;
        categoryBreakdown[tx.category] = (categoryBreakdown[tx.category] || 0) + tx.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setCategoryData(categoryBreakdown);
  }, [transactions, selectedMonth]);

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
      },
    ],
  };

  const barChartData = {
    labels: ["Entrate", "Uscite"],
    datasets: [
      {
        label: "Importo",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="reports-container">
      <h2>Report delle Spese</h2>
      <div className="date-filter">
        <label>Seleziona Mese:</label>
        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      </div>

      <div className="summary-cards">
        <div className="income-card">
          <p>Entrate Totali</p>
          <h3 className="income">{totalIncome.toLocaleString()} $</h3>
        </div>
        <div className="expense-card">
          <p>Uscite Totali</p>
          <h3 className="expense">{totalExpense.toLocaleString()} $</h3>
        </div>
      </div>

      <div className="charts-container">
        {/* Grafico a torta spese per categoria */}
        <div className="chart-item pie-chart">
          <h3>Ripartizione Spese per Categoria</h3>
          {Object.keys(categoryData).length === 0 ? (
            <NoTransactions />
          ) : (
            <Pie data={pieChartData} />
          )}
        </div>

        {/* Grafico a barre entrate vs uscite */}
        <div className="chart-item bar-chart">
          <h3>Entrate vs Uscite</h3>
          {totalIncome === 0 && totalExpense === 0 ? (
            <NoTransactions />
          ) : (
            <div className="chart-wrapper">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;
