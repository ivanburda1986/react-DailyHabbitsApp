import React, { Component } from "react";
import PropTypes from "prop-types";

//Styles
import classes from "./Habit.module.css";

//Icons
import deletionIcon from "../../media/icons/delete.svg";

const Habit = (props) => {
  const [habitClasses, sethabitClasses] = React.useState([classes.Habit]);

  const propTypes = {
    age: PropTypes.number.isRequired,
    clicked: PropTypes.func.isRequired,
    habitId: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  //Makes sure the creation animation is played only after the creation, not always when the page re-renders
  React.useEffect(() => {
    if (Date.now() - props.age < 1000) {
      setTimeout(() => {
        const habitClasses = [...habitClasses];
        habitClasses.push(classes.Shine);
        this.setState({ habitClasses: habitClasses });
      }, 1);
    }
  }, []);

  if (props.completed) {
    const habitClasses = [...habitClasses];
    habitClasses.push(classes.Completed);
    this.setState({ habitClasses: habitClasses });
  }

  return (
    <div id={props.habitId} className={habitClasses.join(" ")} data-id={props.habitId}>
      <div className={classes.HabitLeft}>
        <img src={props.icon} />
      </div>
      <div className={classes.HabitCenter}>
        <p className={classes.Title}>{props.title}</p>
        <p className={classes.Subtitle}>{props.subtitle}</p>
      </div>
      <div className={classes.HabitRight}>
        <div className={classes.Streak}>{props.streak}</div>
        <button className={classes.HabitDeletionBtn} onClick={props.clicked}>
          <img src={deletionIcon} />
        </button>
      </div>
    </div>
  );
};

export default Habit;
