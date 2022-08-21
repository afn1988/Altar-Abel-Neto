import React, { useState, useContext } from "react";  
import { GeneratorContext } from '../context/GeneratorContext';

const Grid: React.FC = (props) => {  
    const {grid, setGrid} = useContext(GeneratorContext)
    return(
        <div> 
            {grid && <div className="grid">
                {grid.grid.map((el:string[], index:number) => (
                    <div key={index} className="gridrow"> 
                    {el.map((element:string, index:number) => (
                        <div className="gridcell" key={index}>{element}</div>
                    ))}
                    </div>
                ))}
            </div>}
            {!grid && <div className="grid">
                {[...Array(10)].map((el, index:number) => (
                    <div key={index} className="gridrow"> 
                    {[...Array(10)].map((element:string, index:number) => (
                        <div className="gridcell" key={index}>{element}</div>
                    ))}
                    </div>
                ))}
            </div>} 
        </div>
    )
}

export default Grid