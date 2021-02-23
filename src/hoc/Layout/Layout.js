import React, {Component} from 'react';

import TopNavigation from '../../components/Navigation/TopNavigation/TopNavigation';


class Layout extends Component {
  render(){
    return(
      <React.Fragment>
        <TopNavigation/>
        <main>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;

