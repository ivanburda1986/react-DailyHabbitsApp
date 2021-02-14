import React, {Component} from 'react';

import TodayHabit from '../../components/TodayHabit/TodayHabit';

import classes from './TodayHabits.module.css';


class TodayHabits extends Component{
  state = {
    todatHabits: [
      {
        id: 1,
        icon: null,
        title: 'Walk 5 kilometers',
        subtitle: 'Ideally at a fast pace outdoors',
        streak: 15,
        completed: false
      },
      {
        id: 2,
        icon: null,
        title: 'Do 50 push ups',
        subtitle: 'The first serious to the exhaustion',
        streak: 4,
        completed: true
      },
      {
        id: 3,
        icon: null,
        title: 'Do 100 squats',
        subtitle: 'At least 20 single-legged',
        streak: 16,
        completed: true
      }
    ]
  }


  render(){

    return(
      <div className={classes.TodayHabits}>
        {this.state.todatHabits.map(habit=>(
          <TodayHabit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} completed={habit.completed}/>
        ))}
      </div>
    );
  }
}

export default TodayHabits;