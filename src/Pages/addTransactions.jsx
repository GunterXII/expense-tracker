import "../styles/addTransaction.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddTransactions() {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState(""); // stringa per input controllato
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const location = useLocation();
  const [transactions, setTransactions] = useState([]); // stato locale per comodità
  const [editIndex, setEditIndex] = useState(null); // null = nuova transazione

  // funzione sicura per leggere transactions dal localStorage
  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem("transactions");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Errore parsing localStorage:", err);
      return [];
    }
  };

  useEffect(() => {
    // carico le transazioni nello stato locale all'avvio
    const loaded = loadFromStorage();
    setTransactions(loaded);

    // se arrivo qui con uno stato, significa che sono in modalità "modifica"
    if (location.state && location.state.transaction) {
      const passed = location.state.transaction;
      const tx = passed.transaction ?? passed;
      const idx = passed.index ?? tx.index ?? null;

      if (tx) {
        // pre-riempio i campi del form
        if (tx.type) setType(tx.type);
        if (typeof tx.amount !== "undefined" && tx.amount !== null) {
          setAmount(String(tx.amount));
        }
        if (tx.category) setCategory(tx.category);
        if (tx.description) setDescription(tx.description);
        if (tx.date) setDate(tx.date);

        setEditIndex(typeof idx === "number" ? idx : null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function submitForm(e) {
    e.preventDefault();

    // validazioni base
    if (amount.trim() === "" || !category || !description.trim() || !date) {
      alert("Per favore compila tutti i campi");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (Number.isNaN(parsedAmount)) {
      alert("Inserisci un numero valido per l'importo");
      return;
    }

    // leggo quelle già salvate
    let existing = loadFromStorage();

    // costruisco l'oggetto transazione
    const current = {
      type,
      amount: parsedAmount,
      category,
      description,
      date,
    };

    let updated;
    if (editIndex === null) {
      // nuova transazione → aggiungo
      updated = [...existing, current];
    } else {
      // modifica: sostituisco la transazione all'indice giusto
      updated = [...existing];
      if (editIndex < 0 || editIndex >= updated.length) {
        updated.push(current);
      } else {
        updated[editIndex] = current;
      }
      setEditIndex(null);
    }

    // salvo in localStorage
    try {
      localStorage.setItem("transactions", JSON.stringify(updated));
      setTransactions(updated);
      // evento custom per aggiornare altri componenti
      window.dispatchEvent(new Event("transactionsUpdated"));
    } catch (err) {
      console.error("Errore salvando localStorage:", err);
      alert("Errore nel salvataggio, controlla la console.");
      return;
    }

    // reset campi form
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setType("Expense");

    // messaggi finali
    if (editIndex === null) {
      alert("Transazione aggiunta con successo");
    } else {
      alert("Transazione modificata con successo");
    }
  }

  return (
    <div className="add-transaction-container">
      <h2>{editIndex === null ? "Aggiungi Transazione" : "Modifica Transazione"}</h2>

      <form className="transaction-box" onSubmit={submitForm}>
        {/* Selezione tipo transazione */}
        <div className="transaction-type">
          <label>
            <input
              type="radio"
              value="Expense"
              checked={type === "Expense"}
              onChange={() => setType("Expense")}
            />
            Spesa
          </label>
          <label>
            <input
              type="radio"
              value="Income"
              checked={type === "Income"}
              onChange={() => setType("Income")}
            />
            Entrata
          </label>
        </div>

        {/* Importo */}
        <input
          type="number"
          placeholder="Importo (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="any"
        />

        {/* Categoria */}
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleziona una categoria</option>
          <option value="Stipendio">Stipendio</option>
          <option value="Spesa alimentare">Spesa alimentare</option>
          <option value="Ristoranti">Ristoranti</option>
          <option value="Trasporti">Trasporti</option>
          <option value="Divertimento">Divertimento</option>
          <option value="Altro">Altro</option>
        </select>

        {/* Descrizione */}
        <textarea
          value={description}
          placeholder="Descrizione"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Data */}
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        {/* Pulsante */}
        <button type="submit">
          {editIndex === null ? "Aggiungi Transazione" : "Salva Modifiche"}
        </button>
      </form>
    </div>
  );
}

export default AddTransactions;
