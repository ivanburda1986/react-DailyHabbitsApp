import React, { Component } from 'react';

//Firebase
import firebase from "firebase";

//Own components
import Habit from '../../components/Habit/Habit';
import HabitTemplate from '../../components/HabitTemplate/HabitTemplate';
import Snackbar from '../../components/Snackbar/Snackbar';

//Styles
import classes from './SetupHabits.module.css';

class SetupHabits extends Component {
  state={
    habits: [
    
    ],
    deletedHabits:[

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
      creationDate: newHabit.creationDate,
      icon : newHabit.icon,
      title : newHabit.title,
      subtitle : newHabit.subtitle,
      streak : newHabit.streak,
      completed: newHabit.completed,
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
    //return firebase.database().ref(`/habits/${habitId}`).remove();
  };



  //Handlers
  addHabitHandler = (newHabit) => {
    let updatedHabits = [...this.state.habits];
    updatedHabits.push(newHabit);
    this.setState({habits: updatedHabits});
    this.POSThabit(newHabit);
  }

  deleteHabitHandler = (clickedHabit) => {
    //Get ID of the habit to be deleted
    let habitToDeleteId = clickedHabit.target.parentNode.parentNode.parentNode.getAttribute("data-id");

    //Get all habits except of the one which should be deleted and update the state
    let updatedHabits = this.state.habits.filter(element=>{
      return element.id !== habitToDeleteId;
    })
    this.setState({habits:updatedHabits});

    //Get habit to be deleted and preserve it temporarily
    let habitToDelete = this.state.habits.filter(element=>{
      return element.id === habitToDeleteId;
    })

    this.DELETEhabit(habitToDeleteId);
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.SetupHabits}>
          {/* Habits creation template */}
          <HabitTemplate addHabit={this.addHabitHandler}/>

          {/* Individual habits */}
          {this.state.habits.map(habit=>(
            <Habit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} habitId={habit.id} clicked={this.deleteHabitHandler}/>
          ))}
        </div>
        <Snackbar/>
      </React.Fragment>
    );
  }
}

export default SetupHabits;