import React, { Component } from 'react';

//Axios
import axios from '../../axios-habits';

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
    
    ]
  }

  addHabitHandler = (newHabit) => {
    let updatedHabits = [...this.state.habits];
    updatedHabits.push(newHabit);
    this.setState({habits: updatedHabits});

    //Send the habit to the server
    axios.post('/habits.json', newHabit)
      .then(response=>console.log(response))
      .catch(error=>console.log(error));
  }

  deleteHabitHandler = (clickedHabit) => {
    let habitToDeleteId = clickedHabit.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    let updatedHabits = this.state.habits.filter(element=>{
      return element.id !== habitToDeleteId;
    })
    this.setState({habits:updatedHabits});
  }

  render() {
    return (
      <div className={classes.SetupHabits}>
        {/* Habits creation template */}
        <HabitTemplate addHabit={this.addHabitHandler}/>

        {/* Individual habits */}
        {this.state.habits.map(habit=>(
          <Habit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} habitId={habit.id} clicked={this.deleteHabitHandler}/>
        ))}
      </div>
    );
  }
}

export default SetupHabits;