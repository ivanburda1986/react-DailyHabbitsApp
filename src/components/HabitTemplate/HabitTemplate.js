import React, {Component} from 'react';

//Component
import HabitIconSelection from '../UI/HabitIconSelection/HabitIconSelection';

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
    selectedIcon: null,
    selectedIconImage: questionmark,
  }

  handleIconSelection = (clickedIcon)=>{
    this.setState({selectedIcon: clickedIcon.target.value, selectedIconImage:clickedIcon.target.nextSibling.children[0].src});
  };

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
              <input type="text" className={classes.HabitTemplateTitle} name="HabitTemplateTitle" placeholder="Habit name"></input>
              <label htmlFor="HabitTemplateDescription"></label>
              <input type="text" className={classes.HabitTemplateDescription} name="HabitTemplateDescription" placeholder="Description"></input>
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
  
          </div>
        </div>
      </div>
  
    );
  }




};

export default HabitTemplate;





