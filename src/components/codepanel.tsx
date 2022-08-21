import React, { useState, useContext } from "react";  
import { GeneratorContext } from '../context/GeneratorContext';

const CodePanel: React.FC = (props) => {  
    const {grid, setGrid, code, setCode} = useContext(GeneratorContext)
    return( 
        <div className="codePanel"><span>YOUR CODE NOW: </span>{code}</div>
    )
}

export default CodePanel