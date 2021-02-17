import React, {Component} from 'react';

//Own components
import TodayHabit from '../../components/TodayHabit/TodayHabit';

//Icons
import sportIcon from '../../media/icons/sport.png';
import sleepIcon from '../../media/icons/sleep.png';
import readingIcon from '../../media/icons/reading.png';
import programmingIcon from '../../media/icons/programming.png';
import guitarIcon from '../../media/icons/guitar.png';
import alarmclockIcon from '../../media/icons/alarmclock.png'


//Classes
import classes from './TodayHabits.module.css';
import habitIconSelection from '../../components/UI/HabitIconSelection/HabitIconSelection';


class TodayHabits extends Component{
  state = {
    todayHabits: [
      {
        id: 0,
        icon: sportIcon,
        title: 'Walk 5 kilometers',
        subtitle: 'Ideally at a fast pace outdoors',
        streak: 15,
        completed: false
      },
      {
        id: 1,
        icon: guitarIcon,
        title: 'Play the guitar for 60 minutes',
        subtitle: 'At least 30 on training difficult stuff',
        streak: 4,
        completed: true
      },
      {
        id: 2,
        icon: readingIcon,
        title: 'Read for 30 minutes',
        subtitle: 'Novels or educational books',
        streak: 16,
        completed: true
      },
      {
        id: 3,
        icon: programmingIcon,
        title: 'Programming for 90 minutes',
        subtitle: 'Of really focused time',
        streak: 352,
        completed: false
      },
      {
        id: 4,
        icon: alarmclockIcon,
        title: 'Sleep for 7 hours at least',
        subtitle: 'Get some good sleep',
        streak: 3,
        completed: false
      }
    ],
    checker: true
  }

  completionClickHandler = (todayHabitId) =>{
    const todayHabits = [...this.state.todayHabits];
    const myHabit = {...todayHabits[todayHabitId]};
    myHabit.completed = !myHabit.completed;
    todayHabits[todayHabitId] = myHabit;
    this.setState({todayHabits:todayHabits});
  }
  
  streakHandler = () =>{
    // call this function always on component load and always on component update (after completionClickHandler)
    // habits for each check streak
    // updated today: streak keep, completed true
    // updated yesterday: streak keep, completed false
    // updated before yesterday: streak reset, completed false
    // send to server
  }



  render(){

    return(
      <div className={classes.TodayHabits}>
        {this.state.todayHabits.map(habit=>(
          <TodayHabit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} completed={habit.completed} clicked={()=>this.completionClickHandler(habit.id)}/>
        ))}
      </div>
    );
  }
}

export default TodayHabits;