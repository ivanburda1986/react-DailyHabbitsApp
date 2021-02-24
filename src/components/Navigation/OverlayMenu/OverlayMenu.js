import React from 'react';
import classes from './OverlayMenu.module.css';


import NavigationItems from '../NavigationItems/NavigationItems';


const OverlayMenu = (props) =>{
  let overlayMenuClasses = [classes.OverlayMenu, classes.Close];

  if(props.open === true){
    overlayMenuClasses = [classes.OverlayMenu, classes.Open];
  }


  return(
    <React.Fragment>
      
      <div className={overlayMenuClasses.join(" ")} onClick={props.closed}>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default OverlayMenu;