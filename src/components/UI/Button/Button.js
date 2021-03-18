import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';


const Button = (props) =>{
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

Button.propTypes = {
  buttonTitle: PropTypes.string.isRequired 
}


export default Button;