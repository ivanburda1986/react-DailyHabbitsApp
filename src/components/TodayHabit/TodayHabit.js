import React from 'react';

import classes from './TodayHabit.css';

const todayHabit = () =>{

return(
<div className={classes.Order}>
  <div className={classes.todayHabitLeft}>
    <p>img</p>
  </div>
  <div className={classes.todayHabitCenter}>
    <p>Walk 5 kilometers</p>
    <p>Ideally at a fast pace outdoors</p>
  </div>
  <div className={classes.todayHabitRight}>
    <p>312</p>
    <p>DONE</p>
  </div>
</div>
);

};

export default todayHabit;