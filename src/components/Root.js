import React, {Component} from 'react';
import { View } from 'react-native';

import Alert from './header/Alert';
import Header from './header/Header';
import List from './list/List';
import Map from './map/Map';
import Result from './result/Result';

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
        <View style={{height: '100vh', flexDirection: 'column-reverse'}}>
          
          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{backgroundColor: "#FEFEFE"}}>
              <Route path="/" >
                <List />
              </Route>
            </View>

            <View style={{flex: 1}}>
              <Route path="/" component={Map} />
              <Route path="/dive-sites" component={Result} />
            </View>

          </View>
          <Route path="/" >
            <Header />
            <Alert />
          </Route>
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
