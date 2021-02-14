import React from 'react';

import classes from './TodayHabit.module.css';

//Icons
import checkmark from '../../media/icons/checkmark.png';
import checkmarkCompleted from '../../media/icons/checkmarkCompleted.png';
import streakflame from '../../media/icons/streakflame.svg';



const todayHabit = (props) =>{

//Evaluation component classes  
const habitClasses = [classes.Habbit];
if(props.completed){
  habitClasses.push(classes.Completed);
};


return(
<div className={habitClasses.join(' ')}>
  <div className={classes.TodayHabitLeft}>
    <img src={props.icon}/>
  </div>
  <div className={classes.TodayHabitCenter}>
    <p className={classes.Title}>{props.title}</p>
    <p className={classes.Subtitle}>{props.subtitle}</p>
  </div>
  <div className={classes.TodayHabitRight}>
    <div className={classes.Streak}>
    {props.streak}
    </div>
    <button 
      className={classes.HabitCompletionBtn}
      onClick={props.clicked}
      >
        <img src={(props.completed ? checkmarkCompleted : checkmark )} className={(props.completed ? classes.CheckmarkCompleted : null )}/>
      </button>
  </div>
</div>
);

};

export default todayHabit;