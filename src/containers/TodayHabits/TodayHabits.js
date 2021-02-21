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
    // let objectToUpdate = {
    //   [functionArgs.attribute]:functionArgs.newValue
    // }

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


  completionClickHandler = (todayHabitId) =>{
    //Making sure I do not update the state immediately
    const todayHabits = [...this.state.todayHabits];
    const myHabit = todayHabits.filter(habit=>{return habit.id === todayHabitId});
    const habitToUpdate = new Object(...myHabit);
    Date.now() -  habitToUpdate.completed < 86400000 ? habitToUpdate.completed = 0 : habitToUpdate.completed = Date.now();



    //this.setState({todayHabits:todayHabits});
    // console.log(habitToUpdate);
    // console.log(todayHabits);

    //this.PUThabit({attribute: 'lastStreakUpdateTime', newValue: Date.now(), id: todayHabitId});
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
          <TodayHabit key={habit.id} icon={habit.icon} title={habit.title} subtitle={habit.subtitle} streak={habit.streak} completed={habit.completed} clicked={()=>this.completionClickHandler(habit.id)}/>
        ))}
      </div>
    );
  }
}

export default TodayHabits;