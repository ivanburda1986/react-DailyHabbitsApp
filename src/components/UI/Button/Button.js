import React from 'react';

import classes from './Button.module.css';


const button = (props) =>{

  return(
    <button 
    className={classes.Button} 
    onClick={()=>{if(props.clickd===undefined){return}else{props.clicked()}} }>
      
      {props.buttonTitle}
    </button>
  );

}

export default button;