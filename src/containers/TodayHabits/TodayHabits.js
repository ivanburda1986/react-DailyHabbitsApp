import React, {Component} from 'react';

import TodayHabit from '../../components/TodayHabit/TodayHabit';

import classes from './TodayHabits.module.css';


class TodayHabits extends Component{

  render(){

    return(
      <div className={classes.TodayHabits}>
        <TodayHabit/>
        <TodayHabit/>
        <TodayHabit/>
      </div>
    );
  }
}

export default TodayHabits;