import React from 'react';

import classes from './Snackbar.module.css';

const Snackbar = (props) =>{

  //Start the fading-out effect
  setTimeout(function(){
    document.getElementById(props.id).classList.add(classes.Disappear);
  }, 1);

  //Remove the snackbar from DOM
  setTimeout(function(){
    props.delete(props.id);
  }, props.displayTime);

  return(
    <div id={props.id} className={classes.Snackbar} style={{bottom: `${props.bottomDistance}px`}}>
      <p>"{props.deletedHabitName}" habit has been deleted.</p>
      <button onClick={props.clicked}>UNDO</button>
    </div>
  );

}

export default Snackbar;