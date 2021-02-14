import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';


import Layout from './hoc/Layout/Layout';

import TodayHabits from './containers/TodayHabits/TodayHabits';

import classes from './App.module.css';

class App extends Component {
  render(){
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path="today" component={TodayHabits}/>
            <Route path="/" component={TodayHabits}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
