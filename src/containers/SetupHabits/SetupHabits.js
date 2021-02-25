import React, { Component } from 'react';

//Firebase
import firebase from "firebase";

//Own components
import Habit from '../../components/Habit/Habit';
import HabitTemplate from '../../components/HabitTemplate/HabitTemplate';
import Snackbar from '../../components/Snackbar/Snackbar';

//Styles
import classes from './SetupHabits.module.css';


let snackBars = [];

class SetupHabits extends Component {
  state={
    habits: [
    
    ],
    habitsWaitingForDeletion:[

    ],
    snackbarDistance: 50,
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
    setTimeout(
      ()=>{
        //Is the habit still waiting for deletion?
        if(this.state.habitsWaitingForDeletion.findIndex(habit=>habit.id===habitId) !==-1){
          //Remove the habit from the habits waiting for deletion
          let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
          let updateHabitsWaitingForDeletion = habitsWaitingForDeletion.filter(element=>{
            return element.id !== habitId;
          })
          this.setState({habitsWaitingForDeletion:updateHabitsWaitingForDeletion});

          //Delete the habit from the server db
          //return firebase.database().ref(`/habits/${habitId}`).remove();
          console.log('Deleted from the database.');
        } else{
          console.log('The habit was not waiting for deletion anymore');
        }
      },5000);
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
    let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
    habitsWaitingForDeletion.push(...habitToDelete);
    this.setState({habitsWaitingForDeletion:habitsWaitingForDeletion});
    

    //Wait before deleting the habit from the database
    this.DELETEhabit(habitToDeleteId);
  }


  undoHabitDeletionHandler = (habitId) =>{
    //Is the habit still waiting for deletion?
    if(this.state.habitsWaitingForDeletion.findIndex(habit=>habit.id===habitId) !==-1){
      let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
      let existingHabits = [...this.state.habits];

      //Get the habit waiting for deletion and push it to existing habits
      let habitToBeRestored = habitsWaitingForDeletion.filter(element=>{
        return element.id === habitId;
      })
      existingHabits.push(...habitToBeRestored);
      this.setState({habits: existingHabits});

      //Remove the habit from the habits waiting for deletion
      let updateHabitsWaitingForDeletion = habitsWaitingForDeletion.filter(element=>{
        return element.id !== habitId;
      })
      this.setState({habitsWaitingForDeletion:updateHabitsWaitingForDeletion});
    }
    
    console.log('The habit deletion has been undone');
  }

  nextSnackbarPosition = () =>{
    let startingPosition = 50;
    let numberOfVisibleSnackbars = this.state.habitsWaitingForDeletion.length;

    if(this.state.habitsWaitingForDeletion.length === 1){
      return startingPosition;
    } else{
      return 80*numberOfVisibleSnackbars;
    }
    
  }



  render() {

    let snacks = this.state.habitsWaitingForDeletion.map(habit=>(
      <Snackbar id={habit.id} key={habit.id} deletedHabitName={habit.title} bottomDistance={this.nextSnackbarPosition()} clicked={()=>this.undoHabitDeletionHandler(habit.id)}/>
    ))

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

        {/* Snackbars */}
        {snacks}
      </React.Fragment>
    );
  }
}

export default SetupHabits;