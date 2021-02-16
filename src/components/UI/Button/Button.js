import React from 'react';

import classes from './Button.module.css';


const button = (props) =>{

  return(
    <button className={classes.Button}>{props.buttonTitle}</button>
  );

}

export default button;