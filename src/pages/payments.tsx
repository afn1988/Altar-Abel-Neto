import React, { useState, useContext, useEffect, useRef } from "react";  
import { Link, NavigateFunction, useNavigate } from "react-router-dom"; 
import { GeneratorContext } from "../context/GeneratorContext";
import CodePanel from "../components/codepanel";
import LivePanel from "../components/livepanel";
import {Button} from "react-bootstrap";
import IPayment from "../interfaces/payment";
import IGrid from "../interfaces/grid";

const PaymentPage: React.FC = (props) => { 
    const {grid, code, setCode, generate, paymentGrid, setPaymentGrid} = useContext(GeneratorContext)
    const[inpPay, setinpPay] = useState<string>("")
    const[amount, setAmount] = useState<number>(0)
    const[showError, setShowError] = useState<boolean>(false)
    const[payment, setPayment] = useState<IPayment>() 
    const[auxUpd, setAuxUpd] = useState<number>(0)
    const navigate:NavigateFunction = useNavigate(); 
    
    useEffect(() => {   
        if(auxUpd>0){ 
            updPaymentDB()
        }
      }, [auxUpd])

    const inputPayChange = (e: React.ChangeEvent<HTMLInputElement>)  => {   
        setinpPay(e.target.value) 
    }
    const inputAmmountChange = (e: React.ChangeEvent<HTMLInputElement>)  => {   
        setAmount(parseFloat(e.target.value)) 
    }
    const updPaymentDB = async () =>{ 
        let obj:Object = {"payments":paymentGrid} 
        console.log(obj)
        var reqoptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
          } 
          try { 
              var response = await fetch('http://134.122.53.23:3021/update',reqoptions);  
              await response.json();  
          } catch (error) { 
              console.log(error) 
          }
    }

    const addPayment = () =>{ 
        if(code && grid){
            setShowError(false)
            let newPayment:IPayment = { 
                grid: grid,
                code: code,
                name: inpPay,
                ammount: amount, 
            } 
            let tmp = paymentGrid
            tmp.push(newPayment)
            setPaymentGrid(tmp)
            console.log(paymentGrid)
            setAuxUpd(auxUpd+1)
        }
        else {
            setShowError(true)
        }
    }
    


    return(
        <div className="main">
            <div className="p-2 bg-light d-flex justify-content-start"> 
                <Button variant="secondary" size="sm" onClick={()=>navigate('/')}>Generator Page</Button>
            </div>  
            <LivePanel/>
            <CodePanel/>
            <div className="d-flex flex-row align-items-end my-4">  
                <div style={{marginRight:"1rem"}}>   
                    <p className="m-0 pb-1 d-flex justify-content-start"><small>PAYMENT</small></p>
                    <input type="text" className="form-control" placeholder="PAYMENT" 
                    value={inpPay} 
                    onChange={inputPayChange.bind(this)}/>
                </div>
                <div style={{marginRight:"1rem"}}>   
                    <p className="m-0 pb-1 d-flex justify-content-start"><small>AMMOUT</small></p>
                    <input type="number" className="form-control" placeholder="AMMOUNT" 
                    value={amount} 
                    onChange={inputAmmountChange.bind(this)}/>
                </div>
                <Button variant="secondary" onClick={() => {addPayment()}}>&#43; ADD</Button>
            </div>
            {showError && <div className="d-flex justify-content-start text-danger">Não existe Código ou Grelha gerada!</div>}
            <div className="py-2 d-flex justify-content-start"><small>PAYMENT LIST</small></div>
            <div className="grid">
                <div className="gridrow">
                    <div className="paygridcell" style={{width: "61%"}}>NAME</div>
                    <div className="paygridcell" style={{width: "13%"}}>AMMOUNT</div>
                    <div className="paygridcell" style={{width: "13%"}}>CODE</div>
                    <div className="paygridcell" style={{width: "13%"}}>GRID</div>
                </div>
                {paymentGrid.map((el:IPayment, index:number) => (
                    <div key={index} className="gridrow">  
                        <div className="paygridcell" style={{width: "61%"}}>{el.name}</div>
                        <div className="paygridcell" style={{width: "13%"}}>{el.ammount}</div>
                        <div className="paygridcell" style={{width: "13%"}}>{el.code}</div>
                        <div className="paygridcell" style={{width: "13%"}}>100</div>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default PaymentPage