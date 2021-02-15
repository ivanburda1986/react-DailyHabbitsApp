import React, { Component } from 'react';

//Own components
import Habit from '../../components/Habit/Habit';
import HabitTemplate from '../../components/HabitTemplate/HabitTemplate';

//Styles
import classes from './SetupHabits.module.css';

//Icons
import sportIcon from '../../media/icons/sport.png';
import sleepIcon from '../../media/icons/sleep.png';
import readingIcon from '../../media/icons/reading.png';
import programmingIcon from '../../media/icons/programming.png';
import guitarIcon from '../../media/icons/guitar.png';
import alarmclockIcon from '../../media/icons/alarmclock.png'



class SetupHabits extends Component {
  state={
    habits: [
      {
        id: 0,
        icon: sportIcon,
        title: 'Walk 5 kilometers',
        subtitle: 'Ideally at a fast pace outdoors',
        streak: 15,
        lastStreakUpdateTime: null,
      }
    ]
  }

  render() {
    return (
      <div className={classes.SetupHabits}>
        {/* Habits creation template */}
        <HabitTemplate/>

        {/* Individual habits */}
        {this.state.habits.map(habit=>(
          <Habit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak}/>
        ))}
      </div>
    );
  }
}

export default SetupHabits;