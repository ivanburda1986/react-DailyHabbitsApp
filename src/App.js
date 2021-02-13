import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';



class App extends Component() {
  render(){
    return (
      <div className="App">
        <Layout>
          <Switch>

          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
