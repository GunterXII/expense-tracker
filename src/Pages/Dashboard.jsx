import RecentTransactions from "../components/recentTransaction";
import "../styles/dashboard.css"
import TransactionCards from '../components/transactioncard';
import { useEffect, useState } from "react";
import {Bar} from'react-chartjs-2';
import {Chart as Chartjs,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import NoTransaction from "../components/notransaction";
import { useNavigate } from "react-router-dom";

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function Dashboard(){
    const navigate=useNavigate()

    // Stati principali
    const[transaction,setTransactions]=useState([]);
    const[totalIncome,setTotalIncome]=useState(0);
    const[totalExpense,setTotalExpense]=useState(0);
    const[balance,setBalance]=useState(0);
    const [categoryData,setCategoryData]=useState({})
    const [maxExpense,setMaxExpense]=useState(0);

    // Lista categorie
    const categories=[
        "Stipendio",
        "Spesa alimentare",
        "Ristoranti",
        "Divertimento",
        "Trasporti",
        "Altro",
    ]

    let categoryBrakedown={}
    let highestExpense=0

    // Inizializzo breakdown categorie a 0
    categories.forEach(c=>{
        categoryBrakedown[c]=0
    })

    // Carica dati da localStorage all’avvio
    useEffect(()=>{
        const existing=JSON.parse(localStorage.getItem("transactions"))||[];
        setTransactions(existing);
        let income=0;
        let expense=0;

        existing.forEach(t=>{
            if(t.type==="Income") {
                income+=t.amount
            }
            else {
                expense+=t.amount
                categoryBrakedown[t.category]=(categoryBrakedown[t.category]||0)+t.amount;
                if(categoryBrakedown[t.category]>highestExpense){
                    highestExpense=categoryBrakedown[t.category] 
                }
            };
        })

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income-expense);
        setCategoryData(categoryBrakedown)
        setMaxExpense(highestExpense)
    },[])

    // Dati per il grafico
    const chartData={
        labels:categories,
        datasets:[
            {
                label:"Spese per categoria",
                data:categories.map((cat)=>categoryData[cat]||0),
                backgroundColor:[
                    "rgba(255,99,132,0.2)",
                    "rgba(54,162,235,0.2)",
                    "rgba(255,206,86,0.2)",
                    "rgba(75,192,192,0.2)",
                    "rgba(153,102,255,0.2)",
                    "rgba(255,159,64,0.2)"
                ]
            }
        ]
    }

    const options = {
    scales: {   // ✅ corretto
        y: {
            beginAtZero: true,
            suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
            grid: {
                display: false
            }
        }
    },
    maintainAspectRatio: false,
}


    return (
        <div className="dashboard">
            <div className="dashboard-inner">
                <h2>Pannello</h2>
                {/* Pulsante per aggiungere transazioni */}
                <button className="add-transaction" onClick={()=>navigate("/add-transactions")}>
                    + Transizione
                </button>
            </div>

            {/* Card riepilogo saldo/entrate/uscite */}
            <TransactionCards balance={balance} income={totalIncome} expense={totalExpense}></TransactionCards>

            <div className="transactions-chart-row">
                <div className="transactions half-width">
                    <h3>Transazioni Recenti</h3>
                    {transaction.length===0
                        ? <NoTransaction></NoTransaction>
                        : <RecentTransactions transaction={transaction}></RecentTransactions>}
                </div>

                <div className="expense-chart half-width">
                    <h3>Spese per Categoria</h3>
                    <div className="chart-container">
                        <Bar data={chartData} options={options}></Bar>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
