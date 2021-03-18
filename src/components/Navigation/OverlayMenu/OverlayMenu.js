import React from 'react';
import PropTypes from 'prop-types';
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

OverlayMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
}

export default OverlayMenu;