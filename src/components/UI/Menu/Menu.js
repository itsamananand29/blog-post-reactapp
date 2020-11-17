import React from 'react';
import './Menu.css';
const menu =(props)=>{
    return(
    <div 
    className='.Menu'
    onClick={props.opened}
    >&#9776;
    
    </div>
    ) 
    
};
export default menu;