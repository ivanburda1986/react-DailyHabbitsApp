import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import TodayHabits from './containers/TodayHabits/TodayHabits';

import classes from './App.module.css';

class App extends Component {
  render(){
    return (
      <div className={classes.App}>
        <Layout>
          <TodayHabits/>
        </Layout>
      </div>
    );
  }
}

export default App;
