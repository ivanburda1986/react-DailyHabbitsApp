import React, { Component } from 'react';

//Firebase
import firebase from "firebase";
import database from '../../firebase';

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

  //Event handlers
  componentDidMount(){
  this.GEThabits();
  }
  
  //Interaction with the firebase database
  POSThabit= (newHabit)=> {
    firebase.database().ref('habits/' + newHabit.id).set({
      id : newHabit.id,
      icon : newHabit.icon,
      title : newHabit.title,
      subtitle : newHabit.subtitle,
      streak : newHabit.streak,
      lastStreakUpdateTime : newHabit.lastStreakUpdateTime,
      lastButOnStreakUpdateTime: newHabit.lastButOnStreakUpdateTime,
    }, 
    (error) => {
      if (error){
        console.log('Saving a new habit to the server has failed');
      } else{
        console.log('A new habit has been saved to the server successfully');
      }
    }
    );
  };

  GEThabits = () => {
    const habits = firebase.database().ref('/habits');
    habits.on('value', (snapshot) =>{
      const data = snapshot.val();

      if(data !== null){
        this.setState({habits: Object.values(data)});
      }
    })
  };



  DELETEhabit = (habitId) => {
    return firebase.database().ref(`/habits/${habitId}`).remove();
    //this.DELETEhabit('f0aa283c-0da9-4b76-88d3-62b7be527f39');
  };



  //Handlers
  addHabitHandler = (newHabit) => {
    let updatedHabits = [...this.state.habits];
    updatedHabits.push(newHabit);
    this.setState({habits: updatedHabits});
    this.POSThabit(newHabit);
  }

  deleteHabitHandler = (clickedHabit) => {
    let habitToDeleteId = clickedHabit.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    let updatedHabits = this.state.habits.filter(element=>{
      return element.id !== habitToDeleteId;
    })
    this.setState({habits:updatedHabits});
    this.DELETEhabit(habitToDeleteId);
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