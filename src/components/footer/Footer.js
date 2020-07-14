import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ReactGA from 'react-ga';

import qs from 'qs';
import { setDiveSite } from '../../redux/actions';
import { connect } from "react-redux";
import StyledLinkWhite from '../buttons/StyledLinkWhite';

ReactGA.initialize('UA-88100612-2');

class Footer extends Component {
  componentDidMount() {
    this.props.history.listen(location => {
      
      if (process.env.NODE_ENV !== "development") {
        ReactGA.set({ page: location.pathname })
        ReactGA.pageview(location.pathname)
      }

      // consider another way to destroy the redux cache for the dive site
      // so the previous dive site doesn't flash on the screen before reloading,
      // and instead shows the loading state for the dive site detail screen.
      if (!qs.parse(location.search, { ignoreQueryPrefix: true }).id) {
        this.props.setDiveSite(null)
      }

      document.body.style.overflow = "visible" // reset enable scroll whenever route changes
    })
  }

  render() {
    return (
      <View>
        <View style={{backgroundColor: 'black'}}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
            <Image style={{width: 150, height: 45, marginRight: 10}} source={require('../../assets/appStoreIos.gif')} />
            <Image style={{width: 150, height: 45}} source={require('../../assets/appStoreAndroid.gif')} />
          </View> */}
          <View style={{marginTop: 50, marginBottom: 50}}>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#DDDDDD'}}>© 2020, Broadwell LLC, or its affiliates</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              
              <StyledLinkWhite to="/conditions" style={{fontSize: 12, color: '#DDDDDD', marginLeft: 10}}>Terms and Conditions</StyledLinkWhite>
              <StyledLinkWhite to="/privacy" style={{fontSize: 12, color: '#DDDDDD', marginLeft: 10}}>Privacy Notice</StyledLinkWhite>
              <StyledLinkWhite to="/contact" style={{fontSize: 12, color: '#DDDDDD', marginLeft: 10}}>Contact Us</StyledLinkWhite>
              
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {  };
};

export default connect(
  mapStateToProps,
  { setDiveSite }
)(Footer);