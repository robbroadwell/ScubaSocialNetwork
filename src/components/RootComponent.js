import React, {Component} from 'react';
import { Helmet } from "react-helmet";

import Alert from './header/Alert';
import AccountRoot from './header/AccountRoot';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import Destinations from './destinations/Destinations';
import DestinationDetail from './destinations/DestinationDetail';
import DiveSites from './dive-sites/DiveSites';
import DiveSiteAdd from './dive-sites/DiveSiteAdd';
import DiveSiteDetail from './dive-sites/DiveSiteDetail';
import Photos from './photos/Photos';
import PhotosOverlay from './photos/PhotosOverlay';
import Animals from './animals/Animals';
import Leaderboard from './leaders/Leaderboard';
import ScrollToTop from '../utility/ScrollToTop';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class RootComponent extends Component {

  render() {
    return (
      <Router>
        <ScrollToTop>

          <Helmet>
              <meta charSet="utf-8" />
              <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
          </Helmet>
          
          {/* <Route path='/' render={(props) => <Alert {...props} style={this.props.style} />} /> */}
          <Route path='/' render={(props) => <Header {...props} style={this.props.style} />} />
          <Route path='/' exact={true} render={(props) => <Home {...props} style={this.props.style} />} />
          <Route path='/destinations' exact={true} render={(props) => <Destinations {...props} style={this.props.style} />} />
          <Route path='/destinations/:id/:idRegion?' exact={true} render={(props) => <DestinationDetail {...props} style={this.props.style} map={this.map} />} />
          <Route path='/dive-sites' exact={true} render={(props) => <DiveSites {...props} style={this.props.style} />} />
          <Route path='/dive-sites/:id' render={(props) => <DiveSiteDetail {...props} style={this.props.style} />} />
          <Route path='/add-dive-site/' render={(props) => <DiveSiteAdd {...props} style={this.props.style} />} />
          <Route path='/photos' render={(props) => <Photos {...props} style={this.props.style} />} />
          <Route path='/animals' exact={true} render={(props) => <Animals {...props} style={this.props.style} />} />
          <Route path='/leaderboard' exact={true} render={(props) => <Leaderboard {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <Footer {...props} style={this.props.style} />} />
          <Route path='/photos/418596049' render={(props) => <PhotosOverlay {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <AccountRoot {...props} style={this.props.style} />} />
        </ScrollToTop>
      </Router>
      
    );
  }
}

export default RootComponent;
