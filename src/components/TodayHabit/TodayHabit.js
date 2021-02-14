import React from 'react';

import classes from './TodayHabit.module.css';

const todayHabit = (props) =>{
console.log(classes.Habbit);


//Evaluates the completion state and returns what to show to the user
const completionEvaluation = ()=>{
  if(props.completed === true){
    return 'DONE';
  }
  else{
    return 'TICK';
  }
}


return(
<div className={classes.Habbit}>
  <div className={classes.TodayHabitLeft}>
    <img src={props.icon}/>
  </div>
  <div className={classes.TodayHabitCenter}>
    <p className={classes.Title}>{props.title}</p>
    <p className={classes.Subtitle}>{props.subtitle}</p>
  </div>
  <div className={classes.TodayHabitRight}>
    <p>{props.streak}</p>
    <p>{completionEvaluation()}</p>
  </div>
</div>
);

};

export default todayHabit;