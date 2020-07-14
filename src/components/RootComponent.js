import React, {Component} from 'react';
import { Helmet } from "react-helmet";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

import Account from './account/Account';
import AccountRoot from './header/AccountRoot';
import Contact from './legal/Contact';
import Conditions from './legal/Conditions';
import Privacy from './legal/Privacy';
import OverlayActionsRoot from './header/OverlayActionsRoot';
import Header from './header/Header';
import Footer from './footer/Footer';
import Users from './users/Users';
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

import { fetchDestinations, fetchTopDestinations } from "../redux/actions";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { getUser } from '../redux/selectors';

class RootComponent extends Component {

  componentWillMount() {
    this.props.fetchDestinations()
    this.props.fetchTopDestinations()
  }

  render() {
    return (
      <Router>
        <ScrollToTop>

          <Helmet>
              <meta charSet="utf-8" />
              <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
          </Helmet>

          <View style={{flexDirection: 'column-reverse'}}>
            {/* <Route path='/' render={(props) => <Alert {...props} style={this.props.style} />} /> */}
            <Route path='/' render={(props) => <Footer {...props} style={this.props.style} />} />
            {/* <Route path='/users/:id/:tab?' render={(props) => <Users {...props} style={this.props.style} />} /> */}
            <Route path='/contact' exact={true} render={(props) => <Contact {...props} style={this.props.style} />} />
            <Route path='/conditions' exact={true} render={(props) => <Conditions {...props} style={this.props.style} />} />
            <Route path='/privacy' exact={true} render={(props) => <Privacy {...props} style={this.props.style} />} />
            {/* <PrivateRoute path='/account' exact={true} user={this.props.user} render={(props) => <Account {...props} style={this.props.style} />} /> */}
            <Route path='/' exact={true} render={(props) => <Home {...props} style={this.props.style} />} />
            <Route path='/destinations' exact={true} render={(props) => <Destinations {...props} style={this.props.style} />} />
            <Route path='/destinations/:id/:idRegion?' exact={true} render={(props) => <DestinationDetail {...props} style={this.props.style} map={this.map} />} />
            <Route path='/dive-sites' exact={true} render={(props) => <DiveSites {...props} style={this.props.style} />} />
            <Route path='/dive-sites/:id' render={(props) => <DiveSiteDetail {...props} style={this.props.style} />} />
            <Route path='/add-dive-site/' render={(props) => <DiveSiteAdd {...props} style={this.props.style} />} />
            {/* <Route path='/photos' render={(props) => <Photos {...props} style={this.props.style} />} />
            <Route path='/animals' exact={true} render={(props) => <Animals {...props} style={this.props.style} />} />
            <Route path='/leaderboard' exact={true} render={(props) => <Leaderboard {...props} style={this.props.style} />} />
            <Route path='/photos/418596049' render={(props) => <PhotosOverlay {...props} style={this.props.style} />} /> */}
            <Route path='/' render={(props) => <Header {...props} style={this.props.style} />} />
          </View>

          <Route path='/' render={(props) => <OverlayActionsRoot {...props} style={this.props.style} />} />
          <Route path='/' render={(props) => <AccountRoot {...props} style={this.props.style} />} />
          
        </ScrollToTop>
      </Router>
      
    );
  }
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ user, render, ...rest }) {
  console.log(user.token)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.token ? (
          render()
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { fetchDestinations, fetchTopDestinations }
)(RootComponent);
