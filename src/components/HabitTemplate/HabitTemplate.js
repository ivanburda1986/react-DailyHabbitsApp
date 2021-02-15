import React, {Component} from 'react';

//Style
import classes from './HabitTemplate.module.css';

//Icons
import sportIcon from '../../media/icons/sport.png';
import sleepIcon from '../../media/icons/sleep.png';
import readingIcon from '../../media/icons/reading.png';
import programmingIcon from '../../media/icons/programming.png';
import guitarIcon from '../../media/icons/guitar.png';
import alarmclockIcon from '../../media/icons/alarmclock.png'


class HabitTemplate extends Component {
  state={
    selectedIcon: "readingIcon",
  }

  handleIconSelection = (event)=>{
    this.setState({selectedIcon:event.target.value})
  };

  render(){
    return(
      <div className={classes.HabitTemplate}>
  
        <div className={classes.HabitTemplateTop}>
          <div className={classes.HabitTemplateTopLeft}>
            <img src={alarmclockIcon}/>
          </div>
          <div className={classes.HabitTemplateTopRight}>
            <form>
              <label htmlFor="HabitTemplateTitle"></label>
              <input type="text" id="HabitTemplateTitle" name="HabitTemplateTitle" placeholder="Habit name"></input>
              <label htmlFor="HabitTemplateDescription"></label>
              <input type="text" id="HabitTemplateDescription" name="HabitTemplateDescription" placeholder="Description"></input>
            </form>
          </div>
        </div>
  
        <div className={classes.HabitTemplateBottom}>
          <div className={classes.HabitTemplateBottomLeft}>
              
            <input type="radio" id="sportIcon" name="iconSelection" value="sportIcon" onClick={this.handleIconSelection} />
            <label htmlFor="sportIcon" className={classes.HabitIconSelection}><img src={sportIcon} alt="Sport icon" className={this.state.selectedIcon === "sportIcon" ? classes.selectedIcon : null}/></label>
  
            <input type="radio" id="sleepIcon" name="iconSelection" value="sleepIcon" onClick={this.handleIconSelection}/>
            <label htmlFor="sleepIcon" className={classes.HabitIconSelection}><img src={sleepIcon} alt="Sleep icon" className={this.state.selectedIcon === "sleepIcon" ? classes.selectedIcon : null}/></label>
  
            <input type="radio" id="readingIcon" name="iconSelection" value="readingIcon" onClick={this.handleIconSelection}/>
            <label htmlFor="readingIcon" className={classes.HabitIconSelection}><img src={readingIcon} alt="Reading icon" className={this.state.selectedIcon === "readingIcon" ? classes.selectedIcon : null}/></label>
  
          </div>
  
          <div className={classes.HabitTemplateBottomRight}>
  
          </div>
        </div>
      </div>
  
    );
  }




};

export default HabitTemplate;





