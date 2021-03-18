import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    habits: [],
    habitsWaitingForDeletion:[],
    snackbars:[],
    snackbarDisplayTime: 3500 //ms
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  //Trigger the call for getting existing habits from the server
  componentDidMount(){
  this.GEThabits();
  }

  //Gives the array with habits a stable order
  sortHabits(habits){
    let sortedHabits = Object.values(habits).sort((a,b)=>{
      if(a.orderingParameter < b.orderingParameter){
        return 1;
      } else {
        return -1;
      }
    });
    return sortedHabits;
  }

  //Get existing habits from the server - listening
  ListenToHabits = () => {
    const habits = firebase.database().ref('/habits');
    habits.on('value', (snapshot) =>{
      const data = snapshot.val();
      if(data !== null){
        this.setState({habits: this.sortHabits(data)});
      }
    })
  };

  //Get existing habits from the server - a single event request (no listening)
  GEThabits = () =>{
    firebase.database().ref('/habits').once('value').then((snapshot)=>{
      if(snapshot.exists()){
        this.setState({habits: this.sortHabits(snapshot.val())});
      } else{
        console.log("No data avaiable");
      }
    }).catch(function(error){
      console.log(error);
    });
  }

  //Add a new habit 
  addHabitHandler = (newHabit) => {
    //Update the state
      let updatedHabits = [...this.state.habits];
      updatedHabits.push(newHabit);
      this.setState({habits: this.sortHabits(updatedHabits)});

    //Submit the habit to database
    firebase.database().ref('habits/' + newHabit.id).set({
      id : newHabit.id,
      creationDate: newHabit.creationDate,
      orderingParameter: newHabit.orderingParameter,
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
  }

  //Delete a habit
  deleteHabitHandler = (habitId) => {
    //Update the state to remove the habit from the UI immediately
      let updatedHabits = [...this.state.habits];
      updatedHabits = updatedHabits.filter(element=>{
        return element.id !== habitId;
      })
      this.setState({habits:this.sortHabits(updatedHabits)});

    //Park the data of deletion-candidate habit so that user can undo the deletion
    let habitToDelete = this.state.habits.filter(element=>{
      return element.id === habitId;
    })
    let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
    habitsWaitingForDeletion.push(...habitToDelete);
    this.setState({habitsWaitingForDeletion:habitsWaitingForDeletion});

    //Create a snackbar as an option to revert the habit deletion
    this.createSnackbar(...habitToDelete);

    //Wait before deleting the habit from the database
    setTimeout(
      ()=>{
        //The habit deletion has not been reverted by the user
        if(this.state.habitsWaitingForDeletion.findIndex(habit=>habit.id===habitId) !==-1){
          //Delete the habit from the server
            firebase.database().ref(`/habits/${habitId}`).remove();
            console.log('The habit has just been deleted from the server.');

          //Remove the habit from the habits waiting for deletion
            let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
            let updateHabitsWaitingForDeletion = habitsWaitingForDeletion.filter(element=>{
              return element.id !== habitId;
            })
            this.setState({habitsWaitingForDeletion:updateHabitsWaitingForDeletion});

        }else{
          //The habit deletion has been reverted so no deletion from the serer will be performed
          console.log('The habit was not waiting for deletion anymore');
        }
      }, this.state.snackbarDisplayTime);
  }

  //Revert deletion of a habit
  undoHabitDeletionHandler = (habitId) =>{
    //The habit is still waiting for deletion
    if(this.state.habitsWaitingForDeletion.findIndex(habit => habit.id === habitId) !==-1){
      let habitsWaitingForDeletion = [...this.state.habitsWaitingForDeletion];
      let habits = [...this.state.habits];

      //Get the habit waiting for deletion and restore to the existing habits
      let habitToBeRestored = habitsWaitingForDeletion.filter(element=>{
        return element.id === habitId;
      })
      habits.push(...habitToBeRestored);
      this.setState({habits: this.sortHabits(habits)});

      //Remove the habit from the habits waiting for deletion
      let updateHabitsWaitingForDeletion = habitsWaitingForDeletion.filter(element=>{
        return element.id !== habitId;
      })
      this.setState({habitsWaitingForDeletion:updateHabitsWaitingForDeletion});

      //Delete the snackbar because the habit deletion has been reverted
      this.deleteSnackbar(habitId);
    }
    console.log('The habit deletion has been undone');
  }


  //Create a snackbar
  createSnackbar = (habit) => {
    let updatedSnackbars = [...this.state.snackbars];

    //Calculate UI position for the new snackbar
    let snackbarPosition = 50;
    if(updatedSnackbars.length >= 1){
      snackbarPosition = 50 + updatedSnackbars.length * 90;
    }

    //Create the snackbar
    updatedSnackbars.push(
      {
        id: habit.id,
        element: <Snackbar 
                    id={habit.id} 
                    key={habit.id} 
                    bottomDistance={snackbarPosition} 
                    deletedHabitName={habit.title}
                    displayTime = {this.state.snackbarDisplayTime}
                    delete={this.deleteSnackbar} 
                    clicked={()=>this.undoHabitDeletionHandler(habit.id)} />
      });
    this.setState({snackbars:updatedSnackbars});
    console.log("A snackbar has been created");
  }

  //Delete a snackbar
  deleteSnackbar = (snackbarId) =>{
    let updatedSnackbars = [...this.state.snackbars];
    updatedSnackbars = updatedSnackbars.filter(snackbar=>{
      return snackbar.id !==snackbarId;
    })
    this.setState({snackbars:updatedSnackbars});
    console.log("A snackbar has been deleted");
  }

  render() {

    return (
      <React.Fragment>
        <div className={classes.SetupHabits}>
          {/* Habits creation template */}
          <HabitTemplate addHabit={this.addHabitHandler}/>

          {/* Individual habits */}
          {this.state.habits.map(habit=>(
            <Habit age={habit.orderingParameter} key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} habitId={habit.id} clicked={()=>this.deleteHabitHandler(habit.id)}/>
          ))}
        </div>

        {/* Snackbars */}
        {this.state.snackbars.map(snackbar=>(snackbar.element))}
      </React.Fragment>
    );
  }
}

export default SetupHabits;