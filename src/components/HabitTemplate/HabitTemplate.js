import React, {Component} from 'react';
import {v4 as uuidv4} from 'uuid';

//Component
import HabitIconSelection from '../UI/HabitIconSelection/HabitIconSelection';
import Button from '../UI/Button/Button';

//Style
import classes from './HabitTemplate.module.css';

//Icons
import sportIcon from '../../media/icons/sport.png';
import sleepIcon from '../../media/icons/sleep.png';
import readingIcon from '../../media/icons/reading.png';
import programmingIcon from '../../media/icons/programming.png';
import guitarIcon from '../../media/icons/guitar.png';
import alarmclockIcon from '../../media/icons/alarmclock.png'
import questionmark from '../../media/icons/questionmark.svg';


class HabitTemplate extends Component {

  state={
    selectedIcon: "sportIcon",
    selectedIconImage: sportIcon,
  }

  handleIconSelection = (clickedIcon)=>{
    this.setState({selectedIcon: clickedIcon.target.value, selectedIconImage:clickedIcon.target.nextSibling.children[0].src});
  };

  createNewHabit =()=>{
    let newHabitTitleInput = document.getElementById("newHabitTitleInput");
    let newHabitDescriptionInput = document.getElementById("newHabitDescriptionInput");

    const newHabit = {
      id : uuidv4(),
      icon : this.state.selectedIconImage,
      title : newHabitTitleInput.value,
      subtitle : newHabitDescriptionInput.value,
      streak : 0,
      completed: 0,
    }
    this.props.addHabit(newHabit);
    this.clearUI();
  }

  clearUI =()=>{
    document.getElementById("newHabitTitleInput").value = "";
    document.getElementById("newHabitDescriptionInput").value = "";
    this.setState({selectedIcon: 'sportIcon', selectedIconImage: sportIcon});
  }


  render(){
    return(
      <div className={classes.HabitTemplate}>
  
        <div className={classes.HabitTemplateTop}>
          <div className={classes.HabitTemplateTopLeft}>
            <img src={this.state.selectedIconImage}/>
          </div>
          <div className={classes.HabitTemplateTopRight}>
            <form>
              <label htmlFor="HabitTemplateTitle"></label>
              <input type="text" id="newHabitTitleInput" className={classes.HabitTemplateTitle} name="HabitTemplateTitle" placeholder="New habit name"></input>
              <label htmlFor="HabitTemplateDescription"></label>
              <input type="text" id="newHabitDescriptionInput" className={classes.HabitTemplateDescription} name="HabitTemplateDescription" placeholder="Habit details"></input>
            </form>
          </div>
        </div>
  
        <div className={classes.HabitTemplateBottom}>
          <div className={classes.HabitTemplateBottomLeft}>
              
          <HabitIconSelection iconImage={sportIcon} iconName="sportIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={sleepIcon} iconName="sleepIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={readingIcon} iconName="readingIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={programmingIcon} iconName="programmingIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={guitarIcon} iconName="guitarIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={alarmclockIcon} iconName="alarmclockIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          </div>
  
          <div className={classes.HabitTemplateBottomRight}>
           <Button buttonTitle={"Create"} clicked={this.createNewHabit}/>
          </div>
        </div>
      </div>
  
    );
  }




};

export default HabitTemplate;





