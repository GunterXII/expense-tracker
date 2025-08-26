import { useState, useEffect } from "react";
import "../styles/transaction.css";
import { useNavigate } from "react-router-dom";
import NoTransaction from "../components/notransaction";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const categoryEmojy = {
    Stipendio: "💸",
    Spesa: "🛒",
    Ristoranti: "🍽️",
    Trasporti: "🚗",
    Intrattenimento: "🪅",
    Altro: "📋",
  };

  // funzione che carica i dati in modo sicuro da localStorage
  const loadTransactions = () => {
    try {
      const raw = localStorage.getItem("transactions");
      const parsed = raw ? JSON.parse(raw) : [];
      setTransactions(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Errore parsing localStorage:", err);
      setTransactions([]);
    }
  };

  useEffect(() => {
    // carica all'avvio
    loadTransactions();

    // aggiorna se cambia il localStorage in un'altra tab (evento 'storage')
    const onStorage = (e) => {
      if (e.key === "transactions") loadTransactions();
    };

    // ascolta un event custom che possiamo dispatchare nello stesso tab
    const onCustom = () => loadTransactions();

    window.addEventListener("storage", onStorage);
    window.addEventListener("transactionsUpdated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("transactionsUpdated", onCustom);
    };
  }, []);

  // elimina una transazione per index
  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    localStorage.setItem("transactions", JSON.stringify(updated));
    setTransactions(updated);
  };

  // funzione per modificare una transazione
  function handleEdit(index) {
    const editTransaction = transactions[index];
    if (!editTransaction) return;
    navigate("/add-transactions", {
      state: { transaction: { ...editTransaction, index } },
    });
  }

  return (
    <div className="transactions-container">
      <h2>Tutte le Transazioni</h2>

      {transactions.length === 0 ? (
        <NoTransaction />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Descrizione</th>
              <th>Importo</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Azioni</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => {
              const amount = transaction.amount ?? 0;
              const category = transaction.category ?? "-";
              const description = transaction.description ?? "-";
              const date = transaction.date ?? "-";
              const type = transaction.type ?? "Spesa";
              const emoji = categoryEmojy[category] ?? "📋";

              return (
                <tr key={index}>
                  <td>
                    {emoji} {category}
                  </td>
                  <td>{description || "Nessuna descrizione"}</td>
                  <td className={type === "Income" ? "income" : "expense"}>
                    {amount} $
                  </td>
                  <td>{date}</td>
                  <td>{type === "Income" ? "Entrata" : "Spesa"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(index)}>
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(index)}>Elimina</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={loadTransactions}>Aggiorna</button>
      </div>
    </div>
  );
}

export default Transactions;
