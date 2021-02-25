import React from 'react';

import classes from './Snackbar.module.css';

const Snackbar = (props) =>{

  const snackbarClasses = [classes.Snackbar];
  if(props.disappear){
    snackbarClasses = [classes.Snackbar, classes.Disappear];
  }

  return(
    <div className={snackbarClasses.join(" ")} style={{bottom: `${props.bottomDistance}vh`}}>
      <p>"{props.deletedHabitName}" habit has been deleted.</p>
      <button onClick={props.clicked}>UNDO</button>
    </div>
  );

}

export default Snackbar;