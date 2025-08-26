import { BrowserRouter,Routes,Route, Link} from'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Transactions from './Pages/Transaction'
import Report from './Pages/Report'
import Navbar from './components/navbar'
import NotFound from './Pages/notFound'
import AddTransactions from './Pages/addTransactions'
function App() {

  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} /> //default route
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/report" element={<Report />} />
        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path="/add-transactions" element={<AddTransactions />} /> //aggiunta di una nuova transazione

        {/* Add more routes here */}
      </Routes>
      
    </div>
    
    </BrowserRouter>//serve per supportare il routing, ed il codice va scritto dentro BrowserRouter
  )
}

export default App
