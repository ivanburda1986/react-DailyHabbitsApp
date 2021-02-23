import React from 'react';
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
  let den = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  return den;
}

const topNavigation = (props) =>{
  
  return(
    <div className={classes.TopNavigation}>
      <div className={classes.Container}>
        <div className={classes.Hamburger}>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
        </div>
        <p className={classes.PageTitle}>{getRouteName()}</p><p>{displayDate()}</p>
      </div>
    </div>
  );
}

export default topNavigation;