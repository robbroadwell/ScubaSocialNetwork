import React, {Component} from 'react';
import { View } from 'react-native';

import { connect } from "react-redux";
import { getDiveSites } from '../redux/selectors';
import { Helmet } from "react-helmet";

import Alert from './header/Alert';
import Header from './header/Header';
import Home from './home/Home';
import Explore from './explore/Explore';
import Result from './explore/result/Result';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class RootComponent extends Component {

  render() {
    return (
      <Router>
        <Helmet>
            <meta charSet="utf-8" />
            <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
        </Helmet>
        
        <View style={{width: '100%', height: window.innerHeight}}>
          <Route path='/' render={(props) => <Alert {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <Header {...props} style={this.props.style} />} />
          <Route path='/' exact={true} render={(props) => <Home {...props} style={this.props.style} />} />
          <Route path='/explore' exact={true} render={(props) => <Explore {...props} style={this.props.style} diveSites={this.props.diveSites} />} />
        </View>

      </Router>
      
    );
  }
}

const mapStateToProps = state => {
  const diveSites = getDiveSites(state);
  return { diveSites };
};

export default connect(
  mapStateToProps,
  {  }
)(RootComponent);
