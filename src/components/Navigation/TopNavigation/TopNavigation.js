import React from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

import classes from './TopNavigation.module.css';

const getRouteName = () =>{
  let currentRoute = (useLocation().pathname).replace("/","");
  if(currentRoute === ""){
    currentRoute = "Today";
  }
  return currentRoute;
}

const displayDate = () =>{
  let date = new Date();
  let todaysDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

  getRouteName() === "Today" ? todaysDate = todaysDate : todaysDate = null;
  return todaysDate;
}

const topNavigation = (props) =>{
  
  return(
    <div className={classes.TopNavigation}>
      <div className={classes.Container}>
        <div className={classes.Hamburger} onClick={props.clicked}>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
        </div>
        <p className={classes.PageTitle}>{getRouteName()}</p><p>{displayDate()}</p>
      </div>
    </div>
  );
}

topNavigation.propTypes = {
  clicked: PropTypes.func.isRequired
}

export default topNavigation;