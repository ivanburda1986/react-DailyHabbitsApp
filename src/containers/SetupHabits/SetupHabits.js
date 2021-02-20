import React, { Component } from 'react';


//Firebase
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const  firebaseConfig = {
  apiKey: "AIzaSyBERXVHlBmqzrOnUEFhfjji2k1GZ7pXfYU",
  authDomain: "habits-6349a.firebaseapp.com",
  databaseURL: "https://habits-6349a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "habits-6349a",
  storageBucket: "habits-6349a.appspot.com",
  messagingSenderId: "491187493233",
  appId: "1:491187493233:web:e7d0032961a21b581b7ed0",
  measurementId: "G-7NE3EC8LYV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();



class SetupHabits extends Component {
  state={
    habits: [
    
    ]
  }

  addHabitHandler = (newHabit) => {
    let updatedHabits = [...this.state.habits];
    updatedHabits.push(newHabit);
    this.setState({habits: updatedHabits});

    const myhabit = {
      title: "my new habit"
    }

  this.writeUserData(newHabit);
  }

  writeUserData= (newHabit)=> {
    firebase.database().ref('habits/' + newHabit.id).set({
      id : newHabit.id,
      icon : newHabit.icon,
      title : newHabit.title,
      subtitle : newHabit.subtitle,
      streak : newHabit.streak,
      lastStreakUpdateTime : newHabit.lastStreakUpdateTime,
      lastButOnStreakUpdateTime: newHabit.lastButOnStreakUpdateTime,
    });
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