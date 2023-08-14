import Transaction from "./components/Transaction"
import FormConponent from "./components/FormComponent"
import ReportComponent from "./components/ReportComponent"
import './App.css'
import { useState,useEffect } from "react"
import DataContext from "./data/DataContext"
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom"

function App() {
  const design = {color:'red',textAlign:'center',fontSize:'1.5rem'}

  const initState = [
    {id:1, title:'ค่าเช่าบ้าน', amount:-2000},
    {id:2, title:'เงินเดือน', amount:12000},
    {id:3, title:'ค่าเดินทาง', amount:-500},
    {id:4, title:'ขายของออนไลน์', amount:2000},
  ]
  const [items,setItems] = useState(initState)

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map(items => items.amount)
    const income = amounts.filter(element => element > 0).reduce((total,element)=>total+=element,0)
    const expense = amounts.filter(element => element < 0).reduce((total,element)=>total+=element,0)*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])

  return (
    <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }} >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />}></Route>
              <Route
                path="/insert"
                element={
                  <>
                    <FormConponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
