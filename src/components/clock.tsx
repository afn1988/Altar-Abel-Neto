import React, { useState, useEffect } from "react"

const Clock: React.FC = (props) => {      
    const date = new Date(); 
    const[horx, setHorx] = useState<number>(date.getHours())
    const[minx, setMinx] = useState<number>(date.getMinutes())
    const[secx, setSecx] = useState<number>(date.getSeconds())    
    const secStyle = {
        transform: `rotate(${secx * 6}deg)`
    }
    const minStyle = {
        transform: `rotate(${minx * 6}deg)`
    }
    const horStyle = {
        transform: `rotate(${horx * 30}deg)`
    }    
    useEffect(()=>{  
        setInterval(()=>{
            let date = new Date()
            setHorx(date.getHours())
            setMinx(date.getMinutes())
            setSecx(date.getSeconds())
        }, 1000)
    },[])


    return (
        <div className="analogClockDelimiter">
            <div className="analogClock">
                <div className="secpointer" style={secStyle}></div>
                <div className="minpointer" style={minStyle}></div>
                <div className="horpointer" style={horStyle}></div>
                <div className="dotpointer"></div>
            </div> 
        </div>
    )
}


export default Clock