import React from 'react';
import PropTypes from 'prop-types';

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
    <div id={props.id} className={classes.Snackbar} style={{bottom: `${props.bottomDistance}px`} }>
      <p>"{props.deletedHabitName}" habit has been deleted.</p>
      <button onClick={props.clicked}>UNDO</button>
    </div>
  );
}

Snackbar.propTypes = {
 bottomDistance: PropTypes.number.isRequired,
 clicked: PropTypes.func.isRequired,
 delete: PropTypes.func.isRequired,
 deletedHabitName: PropTypes.string.isRequired,
 displayTime: PropTypes.number.isRequired,
 id: PropTypes.string.isRequired,
}

export default Snackbar;