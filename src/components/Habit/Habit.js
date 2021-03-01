import React, {Component} from 'react';

//Styles
import classes from './Habit.module.css';

//Icons
import deletionIcon from '../../media/icons/delete.svg';




class habit extends Component{
  state = {
    habitClasses: [classes.Habit]
  }

  //Makes sure the creation animation is played only after the creation, not always when the page re-renders
  componentDidMount(){
    if(Date.now() - this.props.age < 1000){
      setTimeout(()=>{
        const habitClasses = [...this.state.habitClasses];
        habitClasses.push(classes.Shine);
        this.setState({habitClasses:habitClasses});
    }, 1);
    }
  }

  render(){
    if(this.props.completed){
      const habitClasses = [...this.state.habitClasses];
      habitClasses.push(classes.Completed);
      this.setState({habitClasses:habitClasses});
    };

    return(
      <div id={this.props.habitId} className={this.state.habitClasses.join(' ')} data-id={this.props.habitId}>
        <div className={classes.HabitLeft}>
          <img src={this.props.icon}/>
        </div>
        <div className={classes.HabitCenter}>
          <p className={classes.Title}>{this.props.title}</p>
          <p className={classes.Subtitle}>{this.props.subtitle}</p>
        </div>
        <div className={classes.HabitRight}>
          <div className={classes.Streak}>
            {this.props.streak}
          </div>
          <button 
            className={classes.HabitDeletionBtn}
            onClick={this.props.clicked}
            >
              <img src={deletionIcon}/>
            </button>
        </div>
      </div>
      );
  }

}

  export default habit;