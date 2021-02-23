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
import mealIcon from '../../media/icons/meal.png'
import generalIcon from '../../media/icons/general.png'
import badhabitIcon from '../../media/icons/badhabit.png'

//DOM Selectors
let newHabitTitleInput = document.getElementById("newHabitTitleInput");
let newHabitDescriptionInput = document.getElementById("newHabitDescriptionInput");

class HabitTemplate extends Component {

  state={
    selectedIcon: "generalIcon",
    selectedIconImage: generalIcon,

    habitForm:{
      HabitTemplateTitle:{
        value: '',
        validation:{
          required: true
        },
        valid: false,
        touched: false,
      },
      HabitTemplateDescription:{
        value: '',
        validation:{
          required: true
        },
        valid: false,
        touched: false,
      }
    },
    formIsValid: false,
  }

  createNewHabit =()=>{
    let date = new Date();
    let creationDate = date.setHours(0,0,0,0);

    const newHabit = {
      id : uuidv4(),
      creationDate: creationDate,
      icon : this.state.selectedIconImage,
      title : newHabitTitleInput.value,
      subtitle : newHabitDescriptionInput.value,
      streak : 0,
      completed: 0,
    }
    this.props.addHabit(newHabit);
    this.clearUI();
  }

  handleIconSelection = (clickedIcon)=>{
    this.setState({selectedIcon: clickedIcon.target.value, selectedIconImage:clickedIcon.target.nextSibling.children[0].src});
  };


  clearUI =()=>{
    document.getElementById("newHabitTitleInput").value = "";
    document.getElementById("newHabitDescriptionInput").value = "";
    this.setState({selectedIcon: 'sportIcon', selectedIconImage: sportIcon});
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event) =>{
    const updatedHabitForm = {
      ...this.state.habitForm
    };
    const updatedHabitFormElement = {
      ...updatedHabitForm[event.target.name]
    };
    updatedHabitFormElement.value = event.target.value;
    updatedHabitFormElement.valid = this.checkValidity(updatedHabitFormElement.value, updatedHabitFormElement.validation);
    updatedHabitFormElement.touched = true;
    updatedHabitForm[event.target.name] = updatedHabitFormElement;

    let formIsValid = false;
    if(updatedHabitForm["HabitTemplateTitle"].valid && updatedHabitForm["HabitTemplateDescription"].valid){
      formIsValid = true;
    }

    this.setState({habitForm: updatedHabitForm, formIsValid:formIsValid});

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
              <input type="text" id="newHabitTitleInput" className={classes.HabitTemplateTitle} name="HabitTemplateTitle" placeholder="New habit name" onChange={(event)=>this.inputChangedHandler(event)}></input>
              <label htmlFor="HabitTemplateDescription"></label>
              <input type="text" id="newHabitDescriptionInput" className={classes.HabitTemplateDescription} name="HabitTemplateDescription" placeholder="Habit details" onChange={(event)=>this.inputChangedHandler(event)}></input>
            </form>
          </div>
        </div>
  
        <div className={classes.HabitTemplateBottom}>
          <div className={classes.HabitTemplateBottomLeft}>
              
          <HabitIconSelection iconImage={generalIcon} iconName="generalIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={badhabitIcon} iconName="badhabitIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={sportIcon} iconName="sportIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={sleepIcon} iconName="sleepIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={readingIcon} iconName="readingIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={programmingIcon} iconName="programmingIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={guitarIcon} iconName="guitarIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={alarmclockIcon} iconName="alarmclockIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          <HabitIconSelection iconImage={mealIcon} iconName="mealIcon" selectedIcon={this.state.selectedIcon} clicked={()=>this.handleIconSelection} />
          </div>
  
          <div className={classes.HabitTemplateBottomRight}>
           <Button disabled={!this.state.formIsValid} buttonTitle={"Create"} clicked={this.createNewHabit}/>
          </div>
        </div>
      </div>
  
    );
  }




};

export default HabitTemplate;





