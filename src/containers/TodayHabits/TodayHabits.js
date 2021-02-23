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

  //Event handlers
  componentDidMount(){
    this.GEThabits();
    
    }

  GEThabits = () => {
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


  completedToday = (completionTimestamp) =>{
    let today = new Date();
    let todayMidnight = today.setHours(0,0,0,0);
    let milisecondsSinceMidnight = Date.now() - todayMidnight;

    return Date.now() - completionTimestamp < milisecondsSinceMidnight;
  }


  completionClickHandler = (todayHabitId) =>{
    //Making sure I do not update the state immediately
    const todayHabits = [...this.state.todayHabits];
    console.log(todayHabits);
    const myHabit = todayHabits.filter(habit=>{return habit.id === todayHabitId});
    const habitToUpdate = new Object(...myHabit);

    //Set the completion state depending on whether the previous update was done today or yesterday
    if(this.completedToday(habitToUpdate.completed)){
      habitToUpdate.completed = 0;
      habitToUpdate.streak >0 ? habitToUpdate.streak-= 1 : habitToUpdate.streak= 0;
    } else{
      habitToUpdate.completed = Date.now();
      habitToUpdate.streak+= 1;
    }

    this.PUThabit(todayHabitId, habitToUpdate);
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

  //No habits -> create the first one
  createHabitHandler = () =>{
    console.log('hello');
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
        clicked={()=>this.completionClickHandler(habit.id)}
      />
    ));
    //No habits yet
    if(todayHabits.length === 3){
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