import React, { useState, useContext } from "react";  
import { GeneratorContext } from '../context/GeneratorContext';

const LivePanel: React.FC = (props) => {  
    const {generate} = useContext(GeneratorContext)
    return(  
        <div className="livePanel">
            <div className={ generate ? "live" : "idle"}></div>
            <div>{generate ? "LIVE" : "IDLE"}</div> 
        </div>  
    )
} 
export default LivePanel