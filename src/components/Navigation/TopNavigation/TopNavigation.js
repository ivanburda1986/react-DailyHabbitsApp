import React from 'react';

import classes from './TopNavigation.module.css';

const topNavigation = (props) =>{



  return(
    <div className={classes.TopNavigation}>
      <div className={classes.Container}>
        <div className={classes.Hamburger}>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
          <div className={classes.HamburgerLine}></div>
        </div>
        <p>Today</p><p>18/2/2021</p>
      </div>
    </div>
  );
}

export default topNavigation;