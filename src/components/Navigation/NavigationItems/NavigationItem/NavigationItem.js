import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.module.css';
import PropTypes from 'prop-types';

const NavigationItem = (props) => {

  return(
    <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
  );

}

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

export default NavigationItem;

