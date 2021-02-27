import React from 'react';

import classes from './Snackbar.module.css';

const Snackbar = (props) =>{
  let snackbarClasses= [classes.Snackbar];

  setTimeout(function(){
    document.getElementById(props.id).classList.add(classes.Disappear);
  }, 1);

  setTimeout(function(){
    props.delete(props.id);
  }, 5000);

  return(
    <div id={props.id} className={snackbarClasses.join(" ")} style={{bottom: `${props.bottomDistance}px`}}>
      <p>"{props.deletedHabitName}" habit has been deleted.</p>
      <button onClick={props.clicked}>UNDO</button>
    </div>
  );

}

export default Snackbar;