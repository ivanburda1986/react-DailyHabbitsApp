import React from 'react';
import PropTypes from 'prop-types';
import classes from './HabitIconSelection.module.css';


const habitIconSelection = (props) =>{
  return(
    <React.Fragment>
      <input type="radio" id={props.iconName} name="iconSelection" value={props.iconName} defaultChecked={props.selectedIcon === props.iconName ? true : false} onClick={props.clicked()}/>
      <label htmlFor={props.iconName} className={classes.HabitIconSelection}><img src={props.iconImage} alt="Icon" className={props.selectedIcon === props.iconName ? classes.selectedIcon : null}/></label>
    </React.Fragment>
  );
}

habitIconSelection.propTypes = {
  clicked: PropTypes.func.isRequired,
  iconImage: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  selectedIcon: PropTypes.string.isRequired,
}

export default habitIconSelection;