import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Own components
import TodayHabit from '../../components/TodayHabit/TodayHabit';
import Button from '../../components/UI/Button/Button';

//Firebase
import firebase from "firebase";
import database from '../../firebase';

//Classes
import classes from './TodayHabits.module.css';



class TodayHabits extends Component{
  state = {
    todayHabits: [
      
    ]
  }

  //Trigger the call for getting existing habits from the server
  componentDidMount(){
    this.ListenToHabits();
    }

  //Get existing habits from the server - listening
  ListenToHabits = () => {
    const habits = firebase.database().ref('/habits');
    habits.on('value', (snapshot) =>{
      const data = snapshot.val();

      if(data !== null){
        this.setState({todayHabits: Object.values(data)});
      }

      //Trigger streak evaluation
      this.streakHandler();
    })
  };
  
  //Update a habit on the server
  PUThabit = (habitId, newData) => {
    return firebase.database().ref(`/habits/${habitId}`).update(newData,
      (error) => {
        if (error){
          console.log('Updating the habit on the server has failed');
        } else{
          console.log('The habit has been updated on the server successfully');
        }
      }
    );
  };

  //Evaluates whether a habit based on its completion timestamp has been completed today
  completedToday = (completionTimestamp) =>{
    let today = new Date();
    let todayBegining = today.setHours(0,0,0,0);
    let millisecondsSinceTodayBeginning = Date.now() - todayBegining;
    
    //Returning true means that the habit's completion state has been updated today
    return (Date.now() - completionTimestamp) < millisecondsSinceTodayBeginning;
  }

  //Toggles today's completion of a habit based on user's click
  habitCompletionClickHandler = (habitId) =>{
    //Copies habits from the state to avoid its mutation
    let updatedTodayHabits = [...this.state.todayHabits];
    let habitToUpdate = updatedTodayHabits.filter(habit=>{return habit.id === habitId});
    habitToUpdate = new Object(...habitToUpdate);

    //If the habit's completion state has already been updated today then the click will result in: 
    if(this.completedToday(habitToUpdate.completed)){
      habitToUpdate.completed = 0; //setting the habit as completed before today
      habitToUpdate.streak > 0 ? habitToUpdate.streak -= 1 : habitToUpdate.streak = 0; //decreasing the streak count
    } else{
      //If the habit's completion has not been updated today yet then the click will result in:
      habitToUpdate.completed = Date.now();
      habitToUpdate.streak += 1;
    }

    //Update the habit's completion in the state
    updatedTodayHabits = updatedTodayHabits.filter(habit=>{return habit.id !== habitId});
    updatedTodayHabits.push(habitToUpdate);
    this.setState({todayHabits:updatedTodayHabits});
    //Submit the habit's completion to the database
    this.PUThabit(habitId, habitToUpdate);
  }
  
  streakHandler = () =>{
    //Returns number of hours since the habit creation
    const daysSinceCreation = (habitCreationDate) =>{
      let today = new Date();
      let todayMidnight = today.setHours(0,0,0,0);
      todayMidnight = todayMidnight/1000;
      let difference = ((todayMidnight - habitCreationDate));
      let hours = parseFloat((difference / 3600).toFixed(2));
      console.log("Hodin:" + hours);
      return hours;
    }

    //Compare a habit age to the number of streaks is has. If the difference is higher than 48 then resets the streak
    const todayHabits = [...this.state.todayHabits];
    const habitWithExpiredStreak = todayHabits.filter(habit=>{
      return daysSinceCreation(habit.creationDate) > habit.streak*24;
    });
    habitWithExpiredStreak.forEach(habit=>{
      habit.streak = 0;
      habit.completed = 0;
      let date = new Date();
      let creationDate = date.setHours(0,0,0,0);
      habit.creationDate = creationDate;
      this.PUThabit(habit.id, habit);
    })
  }

  render(){

    //Today habits
    let todayHabits = this.state.todayHabits.map(habit=>(
      <TodayHabit 
        key={habit.id} 
        icon={habit.icon} 
        title={habit.title} 
        subtitle={habit.subtitle} 
        streak={habit.streak} 
        completed={this.completedToday(habit.completed)} 
        clicked={()=>this.habitCompletionClickHandler(habit.id)}
      />
    ));
    //No habits yet
    if(todayHabits.length === 0){
      todayHabits =
      <div className={classes.noHabitsContainer}>
        <p>There are no habits yet!</p>
        <Link to="/setup">
          <Button clicked={undefined} buttonTitle={"Create a habit"}/>
        </Link>
      </div>
    }


    return(
      <div className={classes.TodayHabits}>
        {todayHabits}
      </div>
    );
  }
}

export default TodayHabits;