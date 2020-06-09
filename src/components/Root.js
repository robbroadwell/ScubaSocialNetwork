import React, {Component} from 'react';
import { View } from 'react-native';

import Alert from './header/Alert';
import Header from './header/Header';
import Register from './header/Register';
import List from './list/List';
import Map from './map/Map';
import Result from './result/Result';
import Conditions from './legal/Conditions';
import Contact from './legal/Contact';
import Privacy from './legal/Privacy';

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
              <Route path="/conditions" component={Conditions} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/register" component={Register} />
            </View>

          </View>
          <Route path="/" component={Header} />
          <Route path="/" component={Alert} />
        </View>
      </Router>
      
    );
  }
}

export default Root;
