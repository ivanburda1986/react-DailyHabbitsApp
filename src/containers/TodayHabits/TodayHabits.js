import React, {Component} from 'react';



//Own components
import TodayHabit from '../../components/TodayHabit/TodayHabit';

//Firebase
import firebase from "firebase";
import database from '../../firebase';

//Icons
// import sportIcon from '../../media/icons/sport.png';
// import sleepIcon from '../../media/icons/sleep.png';
// import readingIcon from '../../media/icons/reading.png';
// import programmingIcon from '../../media/icons/programming.png';
// import guitarIcon from '../../media/icons/guitar.png';
// import alarmclockIcon from '../../media/icons/alarmclock.png'


//Classes
import classes from './TodayHabits.module.css';
import habitIconSelection from '../../components/UI/HabitIconSelection/HabitIconSelection';


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
    const myHabit = todayHabits.filter(habit=>{return habit.id === todayHabitId});
    const habitToUpdate = new Object(...myHabit);

    //Set the completion state depending on whether the previous update was done today or yesterday
    if(this.completedToday(habitToUpdate.completed)){
      habitToUpdate.completed = 0;
      habitToUpdate.streak -= 1;
    } else{
      habitToUpdate.completed = Date.now();
      habitToUpdate.streak += 1;
    }


    this.PUThabit(todayHabitId,habitToUpdate);
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
          <TodayHabit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} completed={this.completedToday(habit.completed)} clicked={()=>this.completionClickHandler(habit.id)}/>
        ))}
      </div>
    );
  }
}

export default TodayHabits;