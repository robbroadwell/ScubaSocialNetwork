import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ReactGA from 'react-ga';

import qs from 'qs';
import { setDiveSite } from '../../redux/actions';
import { connect } from "react-redux";

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
          {/* <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
            <Image style={{width: 150, height: 45, marginRight: 10}} source={require('../../assets/appStoreIos.gif')} />
            <Image style={{width: 150, height: 45}} source={require('../../assets/appStoreAndroid.gif')} />
          </View> */}
          <View style={{marginTop: 50, marginBottom: 50}}>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#DDDDDD'}}>© 2020, Broadwell LLC, or its affiliates</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Terms and Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Privacy Notice</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Contact Us</Text>
              </TouchableOpacity>
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