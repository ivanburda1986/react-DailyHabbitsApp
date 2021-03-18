import React from 'react';
import PropTypes from 'prop-types';

import classes from './TodayHabit.module.css';

//Icons
import checkmark from '../../media/icons/checkmark.png';
import checkmarkCompleted from '../../media/icons/checkmarkCompleted.png';
import streakflame from '../../media/icons/streakflame.svg';


const TodayHabit = (props) =>{
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

TodayHabit.propTypes = {
  clicked: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  streak: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default TodayHabit;