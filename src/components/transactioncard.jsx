function TransactionCards({income, balance, expense}) {

    return(
        <div>
            {/* Card saldo attuale */}
            <div className="balance-card">
                <p>Saldo Attuale</p>
                <h1>{balance}$</h1>
            </div>

            {/* Card riepilogo entrate/uscite */}
            <div className="summary-cards">
                <div className="income-card">
                    <p>Entrate Totali</p>
                    <h3 className="income">{income}$</h3>
                </div>
                <div className="expenses-card">
                    <p>Spese Totali</p>
                    <h3 className="expense">{expense}$</h3>
                </div>
            </div>
        </div>
    )
}
export default TransactionCards;
