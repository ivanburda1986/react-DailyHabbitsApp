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

  componentDidMount(){
    this.GEThabits();
  }

  //Gives the array with habits a stable order
  sortHabits(habits){
    let sortedHabits = Object.values(habits).sort((a,b)=>{
      if(a.title > b.title){
        return 1;
      } else {
        return -1;
      }
    });
    return sortedHabits;
  }

  //Get existing habits from the server - a single event request (no listening)
  GEThabits = () =>{
    firebase.database().ref('/habits').once('value').then((snapshot)=>{
      if(snapshot.exists()){
        this.setState({todayHabits: this.sortHabits(snapshot.val())});
        
        this.streakHandler();
      } else{
        console.log("No data avaiable");
      }
    }).catch(function(error){
      console.log(error);
    });
  }
  
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
    this.setState({todayHabits:this.sortHabits(updatedTodayHabits)});

    //Submit the habit's completion to the database
    this.PUThabit(habitId, habitToUpdate);
  }
  
  //Evaluates whether streak of all habits should be kept or reset. Since I have no server backend to do this, I trigger this evalution on the FE and then updated the server data
  streakHandler = () =>{
    //Returns number of hours since the habit creation timestamp was (re)set
    const hoursSinceHabitCreation = (habitCreationDate, habitTitle) =>{
      let today = new Date();
      let todayBegining = today.setHours(0,0,0,0);
      console.log(`==${habitTitle}==`);
      console.log("Today's beginning: " + todayBegining);
      console.log("Habit creation: " + habitCreationDate);
      let difference = ((todayBegining - habitCreationDate));
      console.log("Today's begining - habit creation: " + difference);
      let habitCreationInHoursBeforeTodayBeginning = parseFloat((difference / 3600000).toFixed(2));
      console.log(`Hours the habit was created before today's beginning:  ${habitCreationInHoursBeforeTodayBeginning}`);

      return habitCreationInHoursBeforeTodayBeginning;
    }

    //If the habit age in [hrs] is greater than its number of streaks*24hrs then it means the habit has not been completed yesterday -> reset its streak to 0 (in the data copy)
    let updatedTodayHabits = [...this.state.todayHabits];

    let habitsWithoutExpiredStreak = updatedTodayHabits.filter(habit=>{
      return hoursSinceHabitCreation(habit.creationDate, habit.title) <= habit.streak * 24; //24 hrs = 1 day
    });

    let habitsWithExpiredStreak = updatedTodayHabits.filter(habit=>{
      console.log(`Hours since creation of "${habit.title}": ${hoursSinceHabitCreation(habit.creationDate)}`);
      console.log("-------------------------");
      return hoursSinceHabitCreation(habit.creationDate, habit.title) > habit.streak * 24; //24 hrs = 1 day
    });

    //For habits with expired streak: Set the streak to 0; Re-set the habit's creation date to today
    habitsWithExpiredStreak.forEach(habit=>{
      let today = new Date();
      let creationDate = today.setHours(0,0,0,0);
      habit.creationDate = creationDate;
      habit.streak = 0;
      habit.completed = 0;
    })

    //Update the state
    updatedTodayHabits = [];
    updatedTodayHabits.push(...habitsWithoutExpiredStreak, ...habitsWithExpiredStreak);
    this.setState({todayHabits: this.sortHabits(updatedTodayHabits)});

    //update the server data
    habitsWithExpiredStreak.forEach(habit=>{
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