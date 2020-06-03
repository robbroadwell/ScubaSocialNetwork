import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';
import Footer from './Footer';
import Result from './Result';

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Root extends Component {
  render() {
    return (
      <Router>
        <View style={{minHeight: '100vh', flexDirection: 'column-reverse'}}>
          
          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{width: 400, backgroundColor: "#FEFEFE"}}>
              <Route path="/" >
                <List />
              </Route>
            </View>

            <View style={{flex: 1}}>
              <Route path="/" component={Map} />
              <Route path="/dive-sites" component={Result} />
            </View>

          </View>
          <Header />
        </View>
      </Router>
      
    );
  }
}

const mapStateToProps = state => {
  return {  };
};

export default connect(
  mapStateToProps,
  {  }
)(Root);
