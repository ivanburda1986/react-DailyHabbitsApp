import React from 'react';

//Styles
import classes from './Habit.module.css';

//Icons
import deletionIcon from '../../media/icons/delete.svg';


const habit = (props) =>{
  //Evaluation component classes  
  const habitClasses = [classes.Habit];
  if(props.completed){
    habitClasses.push(classes.Completed);
  };
  
  
  return(
  <div className={habitClasses.join(' ')} data-id={props.habitId}>
    <div className={classes.HabitLeft}>
      <img src={props.icon}/>
    </div>
    <div className={classes.HabitCenter}>
      <p className={classes.Title}>{props.title}</p>
      <p className={classes.Subtitle}>{props.subtitle}</p>
    </div>
    <div className={classes.HabitRight}>
      <div className={classes.Streak}>
        {props.streak}
      </div>
      <button 
        className={classes.HabitDeletionBtn}
        onClick={props.clicked}
        >
          <img src={deletionIcon}/>
        </button>
    </div>
  </div>
  );
  
  };
  
  export default habit;