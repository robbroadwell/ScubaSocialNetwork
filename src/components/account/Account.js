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
    this.props.history.push(`/`)
    this.props.setUser([]);
  }

  render() {
    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/account');
    }
    
    return (
      <View style={{justifyContent: 'center', margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <View style={{backgroundColor: 'black', padding: 50, alignItems: 'center'}}>
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
