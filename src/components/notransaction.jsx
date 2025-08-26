import { MdInsertPageBreak } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import "../styles/notrans.css";

function NoTransaction(){
    return (
        <div className="no-transactions">
            <FaFileInvoiceDollar className="no-transactions-icon"/>
            <h3>Nessuna transazione trovata</h3>
            <p>Al momento non ci sono transazioni disponibili.</p>
        </div>
    )
}
export default NoTransaction
