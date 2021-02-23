import React from 'react';

import classes from './Button.module.css';


const button = (props) =>{

  //Dynamic classes
  const buttonClasses = [classes.Button];
  if(props.disabled){
    buttonClasses.push(classes.Disabled);
  }

  return(
    <button 
    className={buttonClasses.join(" ")} 
    disabled={props.disabled}
    onClick={()=>{if(props.clicked===undefined){return}else{props.clicked()}} }>
      
      {props.buttonTitle}
    </button>
  );

}

export default button;