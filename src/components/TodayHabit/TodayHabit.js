import React from 'react';

import classes from './TodayHabit.module.css';

const todayHabit = () =>{
console.log(classes.Habbit);
return(
<div className={classes.Habbit}>
  <div className={classes.TodayHabitLeft}>
    <p>img</p>
  </div>
  <div className={classes.TodayHabitCenter}>
    <p className={classes.Title}>Walk 5 kilometers</p>
    <p className={classes.Subtitle}>Ideally at a fast pace outdoors</p>
  </div>
  <div className={classes.TodayHabitRight}>
    <p>312</p>
    <p>DONE</p>
  </div>
</div>
);

};

export default todayHabit;