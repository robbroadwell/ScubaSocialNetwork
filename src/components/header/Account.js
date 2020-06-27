import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setAccountMode } from "../../redux/actions";
import { getUser, getLoginMode } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
const axios = require('axios')

class Account extends Component {
  onPressLogout = () => {
    this.props.setUser([]);
    this.props.setAccountMode(false);
  }

  render() {
    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/account');
    }
    
    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />

        <View style={{alignItems: 'center', marginBottom: 10}}>
          <View style={{backgroundColor: 'black', padding: 50, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.props.setAccountMode(false)} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../assets/close.png')} />
            </TouchableOpacity>

            <Image style={{height: 80, width: 50, margin: 20, marginBottom: 10, tintColor: '#FFFFFF'}} source={require('../../assets/d_logo.svg')} />
            <Text style={{textAlign: 'center', fontSize: 24, color: 'white', marginBottom: 2}}>{this.props.user.username}</Text>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white', marginBottom: 10}}>{this.props.user.email}</Text>
            <TouchableOpacity onPress={() => this.onPressLogout()}>
              <Text style={{textAlign: 'center', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

  export default connect(
    mapStateToProps,
    { setUser, setAccountMode }
  )(withRouter(Account));
