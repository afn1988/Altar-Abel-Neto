import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'; 
import GeneratorPage from './pages/generator';
import PaymentPage from './pages/payments'; 
import IGrid from "./interfaces/grid";
import IPayment from"./interfaces/payment"
import { GeneratorContext } from './context/GeneratorContext';

const App: React.FC = () => {  
  const [grid, setGrid] = useState<IGrid | undefined>(undefined)
  const [code, setCode] = useState<number | undefined>(undefined)
  const [generate, setGenerate] = useState<boolean>(false)   
  const [timeoutID, setTimeoutID] = useState<any>(undefined)  
  const [paymentGrid, setPaymentGrid] = useState<IPayment[]>([]) 
  
  useEffect(() => {  
    const fetchData = async () => {
      const response = await fetch(`http://134.122.53.23:3021/get/`)
      const json = await response.json();  
      try { 
        setPaymentGrid(json.model[0].payments)
      } catch (error) {
        console.log(error)
      }
    }  
    fetchData().catch(console.error);

  }, []);

  useEffect(() => {     
    if(generate && grid){  
        getCode()
    }  
  }, [grid])



  const getCode = async () => {  
    let tmp = grid
    if(tmp){  
        const date = new Date();
        tmp.sec = date.getSeconds(); 
    }
    console.log(tmp)
    var reqoptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grid)
    } 
    try { 
        var response = await fetch('http://134.122.53.23:3021/code',reqoptions);  
        const json = await response.json(); 
        setCode(json.code) 
    } catch (error) { 
        console.log(error) 
    }
  }   
  return (
    <div className="App">  
      <GeneratorContext.Provider value={{grid, setGrid, code, setCode, generate, setGenerate, timeoutID, setTimeoutID, paymentGrid, setPaymentGrid}}>
        <BrowserRouter>
          <Routes>  
            <Route path='/' element={<GeneratorPage/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>
          </Routes>
        </BrowserRouter>
      </GeneratorContext.Provider>
    </div>
  );
}

export default App;
