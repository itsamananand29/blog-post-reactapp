import React from 'react';
import './Input.css';

const input =(props)=>{
    
    let inputEle=null;
    let inputClass = ['InputElement'];
    let errMessage = null;
    if ( props.touched && props.invalid ){
        
            inputClass.push('Invalid')
            errMessage = <p className='ErrorMessage'>Please enter a valid {props.name} !</p>
      
    }
    else{
        inputClass.push('Valid')
    }
    switch(props.elementType){
    case ('input') :
        inputEle =<input className={inputClass.join(' ')}
        value={props.config.value}
        onChange={props.inputChange}
        name={props.id}
        placeholder={props.config.placeholder}
        type={props.config.type}/> 
    break;
    case ('select'):
        inputEle=<select className='Select' onChange={props.inputChange}>
            {props.config.options.map(key=>{
                
                return <option key={key.optionValue}>{key.displayValue}</option>
            })}
        </select>
        
        
    break;
    default :
    inputEle =null
     }       
    return (
        <div>
            <label className='Label'>{props.label}</label>
            {inputEle}
            {errMessage}
        </div>
    )
}

export default input;