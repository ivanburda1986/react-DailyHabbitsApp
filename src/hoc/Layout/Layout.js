import React, {Component} from 'react';

import TopNavigation from '../../components/Navigation/TopNavigation/TopNavigation';
import OverlayMenu from '../../components/Navigation/OverlayMenu/OverlayMenu';

class Layout extends Component {
  state={
    overlayMenu: false,
  }


  overlayMenuCloseHandler = () =>{
    this.setState({overlayMenu: false});
  }

  overlayMenuTogglerHandler = () =>{
    this.setState((prevState)=>{
      return {overlayMenu: !prevState.overlayMenu};
    })
  }

  render(){
    return(
      <React.Fragment>
        <TopNavigation clicked={this.overlayMenuTogglerHandler} />
        <OverlayMenu open={this.state.overlayMenu} closed={this.overlayMenuCloseHandler}/>
        <main>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;

