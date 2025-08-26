import { Link ,useLocation, useNavigate} from "react-router-dom"
import "../styles/navbar.css"
import { useEffect , useState} from "react"
import { Navigate } from "react-router-dom"

function Navbar(){
    const [quote,setQuote] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate=useNavigate()
    const fetchQuote=async()=>{
        try{
            const response=await fetch("https://quotes-api-self.vercel.app/quote")
            const data=await response.json()
            setQuote(data.quote)
            setIsModalOpen(true) // apre la finestra modale quando viene caricata la citazione
            console.log(data.quote)
        }catch(error){
            console.error("Errore nel recupero della citazione",error)
        }
    }

    const location=useLocation(); // Ottieni il percorso attuale
    useEffect(()=>{
        console.log(location.pathname)
    },[location]) // aggiorna il log quando cambia la posizione

    function handleReset(){
        localStorage.clear() // svuota il localStorage quando viene cliccato il reset
        navigate("/") // torna alla pagina principale
    }

    return(
        <>
        <nav className="navbar">
            <h1 className="logo">Gestore Spese</h1>
            <ul className="nav-links">
                <li className={location.pathname==="/"?"active":""}>
                  <Link to="/">📊Pannello</Link>
                </li>
                <li className={location.pathname==="/transactions"?"active":""}>
                  <Link to="/transactions">👛Transazioni</Link>
                </li>
                <li className={location.pathname==="/report"?"active":""}>
                  <Link to="/report">⏳Report</Link>
                </li>
                <li>
                  <div className="quote-btn" onClick={fetchQuote}>💡Ottieni Citazione</div>
                </li>
                <li>
                  <div className="reset-btn" onClick={handleReset}>🔙Pulisci</div>
                </li>
            </ul>
            {
                isModalOpen&&(
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>{quote}</p>
                            <button className="cls-btn" onClick={()=>setIsModalOpen(false)}>Chiudi</button>
                        </div>
                    </div>
                )
            }
        </nav>
        </>
    )
}
export default Navbar
