import React from "react";

function RecentTransactions({ transaction = [] }) {
  // Mappa tra categoria e relativa emoji
  const categoryEmoji = {
    Salary: "💸",         // Stipendio
    Groceries: "🛒",      // Spesa alimentare
    Dining: "🍽️",        // Cena/pranzi fuori
    Transport: "🚗",      // Trasporti
    Entertainment: "🪅",  // Divertimento
    Others: "📋",         // Altre spese
  };

  // Assicurati che "transaction" sia un array
  // .slice(-10) prende solo le ultime 10 transazioni
  // .reverse() le mostra dalla più recente alla meno recente
  const items = Array.isArray(transaction) ? transaction.slice(-10).reverse() : [];

  return (
    <>
      <ul>
        {items.map((trans, i) => {
          // Protezione: se manca qualche campo, usiamo valori di default
          const category = trans?.category ?? "-";
          const amountRaw = trans?.amount;
          // Se amount è un numero valido → converti, altrimenti metti 0
          const amount = Number.isFinite(Number(amountRaw)) ? Number(amountRaw) : 0;
          const type = trans?.type ?? "Expense"; // tipo: Income o Expense
          const emoji = categoryEmoji[category] ?? "📋"; // emoji della categoria

          // Formattazione semplice dell'importo con separatori di migliaia
          // (es. 1200 → 1,200)
          const formattedAmount =
            (amount < 0 ? "-" : "") + Math.abs(amount).toLocaleString();

          // Usa l'id della transazione se disponibile, altrimenti usa l'indice
          const key = trans?.id ?? i; 

          return (
            <li key={key} className="transaction-item">
              <span className="transaction-category">
                {emoji} {category}
              </span>

              {/* Se type è Income assegna classe income, altrimenti expense */}
              <span className={type === "Income" ? "income" : "expense"}>
                {formattedAmount} $
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RecentTransactions;
