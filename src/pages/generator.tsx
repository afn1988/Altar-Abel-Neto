import React, { useState, useContext, useEffect, useRef } from "react"; 
import { useLocation} from 'react-router';
import { Link, NavigateFunction, useNavigate } from "react-router-dom"; 
import { GeneratorContext } from '../context/GeneratorContext';
import IGrid from "../interfaces/grid";
import Grid from "../components/grid";
import CodePanel from "../components/codepanel";
import LivePanel from "../components/livepanel";
import { Row, Col, Button } from "react-bootstrap";
import Clock from "../components/clock";

const GeneratorPage: React.FC = (props) => {  
    const {grid, setGrid, code, setCode, generate, setGenerate, timeoutID, setTimeoutID} = useContext(GeneratorContext)
    const [character, setCharacter] = useState<string>('')  
    const [characterDis, setCharacterDis] = useState<boolean>(false)    
    const navigate:NavigateFunction = useNavigate(); 
    const preventEff = useRef(false); 
    const {pathname} = useLocation();

    useEffect(()=>{
        preventEff.current = false
        console.log("preventEff.current")
    },[pathname])


    useEffect(() => {  
        const callback = () => {    
            getRandomGrid()
            var id = setTimeout(callback, 1000) 
            setTimeoutID(id)
        };  
        if(generate && preventEff.current){ 
            console.log("useEffect")  
            window.clearTimeout(timeoutID)  
            callback()
        } else {
            preventEff.current = true
        } 
    }, [character])


    const getRandomGrid = async () => {   
        try {
            const response = await fetch(`http://134.122.53.23:3021/generator/`+character)
            const json:IGrid = await response.json(); 
            console.log(json)
            setGrid(json)  
        } catch (error) { 
            console.log(error) 
        }
    };     

    const handle_generate = () => {  
        window.clearTimeout(timeoutID)  
        const callback = () => {    
            getRandomGrid() 
            var id = setTimeout(callback, 1000) 
            setTimeoutID(id)
        };   
        if(!generate){ 
            console.log("getRandomGrid")  
            callback()
        } else {
            window.clearTimeout(timeoutID)
        }
        setGenerate(!generate); 
    }; 
    const inputchange = (e: React.ChangeEvent<HTMLInputElement>)  => { 
        let str:string = e.target.value.toLowerCase()
        str.slice(-1).match(/[a-z]/) ? setCharacter(str.slice(-1)) : setCharacter('') 
        setCharacterDis(true)
        setTimeout(()=>setCharacterDis(false),4000) 
    }

    return(
        <div className="main">
            <div className="p-2 bg-light d-flex justify-content-star"> 
                <Button variant="secondary" size="sm" onClick={()=>navigate('/payment')}>Payment Page</Button>
            </div> 
            <div className="d-flex flex-row justify-content-between align-items-center my-4">
                <div>
                    <p className="m-0 pb-1 d-flex justify-content-start"><small>CHARACTER</small></p>
                    <input type="text" className="form-control inputChar" placeholder="CHARACTER" 
                    value={character} 
                    onChange={inputchange.bind(this)}  
                    disabled={characterDis}/>
                </div>
                <Clock/>
                <div><Button variant="secondary" style={{minWidth:"175px"}} onClick={() => {handle_generate()}}>{generate ? "PAUSE" :"GENERATE 2D GRID"}</Button></div> 
            </div>
            <Grid/>
            <LivePanel/>
            <CodePanel/> 
        </div>
    )
}

export default GeneratorPage