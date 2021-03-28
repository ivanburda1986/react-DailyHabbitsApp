import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import TodayHabits from './containers/TodayHabits/TodayHabits';
import SetupHabits from './containers/SetupHabits/SetupHabits';

import classes from './App.module.css';

class App extends Component {

  render(){
    return (
          <div className={classes.App}>
          <Layout>
            <Switch>
              <Route path="/today" exact component={TodayHabits}/>
              <Route path="/setup" exact component={SetupHabits}/>
              <Route path="/" exact component={TodayHabits}/>
              <Redirect from="*" to="/"/>
            </Switch>
          </Layout>
          </div>
    )
  }
}

export default App;
