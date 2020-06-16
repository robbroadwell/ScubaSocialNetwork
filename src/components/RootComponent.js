import React, {Component} from 'react';
import { View } from 'react-native';

import { connect } from "react-redux";
import { getDiveSites } from '../redux/selectors';
import { Helmet } from "react-helmet";

import Alert from './header/Alert';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import Map from './explore/map/Map';
import Explore from './explore/Explore';
import Destinations from './destinations/Destinations';
import DestinationDetail from './destinations/DestinationDetail';
import DiveSites from './dive-sites/DiveSites';
import DiveSiteDetail from './dive-sites/DiveSiteDetail';
import Photos from './photos/Photos';
import PhotosOverlay from './photos/PhotosOverlay';
import Animals from './animals/Animals';
import ScrollToTop from '../utility/ScrollToTop';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class RootComponent extends Component {

  map = <Map style={this.props.style} />

  render() {
    return (
      <Router>
        <ScrollToTop>

          <Helmet>
              <meta charSet="utf-8" />
              <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
          </Helmet>
          
          <Route path='/' render={(props) => <Alert {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <Header {...props} style={this.props.style} />} />
          <Route path='/' exact={true} render={(props) => <Home {...props} style={this.props.style} map={this.map} />} />
          <Route path='/explore' exact={true} render={(props) => <Explore {...props} style={this.props.style} diveSites={this.props.diveSites} />} />
          <Route path='/destinations' exact={true} render={(props) => <Destinations {...props} style={this.props.style} />} />
          <Route path='/destinations/:id' exact={true} render={(props) => <DestinationDetail {...props} style={this.props.style} map={this.map} />} />
          <Route path='/dive-sites' exact={true} render={(props) => <DiveSites {...props} style={this.props.style} />} />
          <Route path='/dive-sites/:id' render={(props) => <DiveSiteDetail {...props} style={this.props.style} />} />
          <Route path='/photos' render={(props) => <Photos {...props} style={this.props.style} />} />
          <Route path='/animals' exact={true} render={(props) => <Animals {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <Footer {...props} style={this.props.style} />} />
          <Route path='/photos/418596049' render={(props) => <PhotosOverlay {...props} style={this.props.style} />} />
          
        </ScrollToTop>
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
