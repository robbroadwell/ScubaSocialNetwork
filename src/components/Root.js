import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getDiveSites } from '../redux/selectors';
import {Helmet} from "react-helmet";

import Alert from './header/Alert';
import Header from './header/Header';
import Register from './header/Register';
import List from './list/List';
import Map from './map/Map';
import Result from './result/Result';
import Conditions from './legal/Conditions';
import Contact from './legal/Contact';
import Privacy from './legal/Privacy';
import PrimaryButton from '../utility/buttons/PrimaryButton';

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
      windowHeight: 0,
      listMode: false
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

  toggleList = () => {
    this.setState(prevState => ({
      listMode: !prevState.listMode
    }));
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
      showSidebar: windowWidth > 1000,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 50 : 150
    };
    
    ReactGA.pageview(window.location.pathname + window.location.search);
    const title = this.state.listMode ? "Return to Map" : this.props.diveSites.length + " results"

    return (
      <Router>
        <Helmet>
            <meta charSet="utf-8" />
            <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
        </Helmet>

        <View style={{height: '100vh', flexDirection: 'column-reverse'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>

            {styles.showSidebar || this.state.listMode ? <List fullScreen={!styles.showSidebar && this.state.listMode} /> : <View/>}

            <View style={{flex: 1}}>
              <Route path="/" component={Map} />
              <Route path="/dive-sites" component={Result} />
              <Route path="/conditions" component={Conditions} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/register" component={Register} />
            </View>

            {styles.showSidebar ? <View></View> :
            <View style={{position: 'absolute', bottom: 40, width: '100%', pointerEvents:'box-none', justifyContent: 'center', flexDirection: 'row'}}>
              <PrimaryButton action={this.toggleList} title={title} icon={require('../assets/search.svg')} />
            </View>}

          </View>
          <Route path="/" component={Header} />
          <Route path="/" component={Alert} />
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
)(Root);
