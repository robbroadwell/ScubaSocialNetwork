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
import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {
    const { windowWidth } = this.state;

    const sidebarCollapsed = windowWidth < 1100;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 50 : 150
    };
    
    console.log(styles.showSidebar)

    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <Router>
        <View style={{height: '100vh', flexDirection: 'column-reverse'}}>
          
          <View style={{flex: 1, flexDirection: 'row'}}>

            {styles.showSidebar ? <List /> : <View/>}

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
