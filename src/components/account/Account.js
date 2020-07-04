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
    return (
      <View style={{flexDirection: 'row', margin: 20}}>
        <View>
          <Text style={{textAlign: 'center', fontSize: 24, color: 'black', marginBottom: 2}}>{this.props.user.username}</Text>
          <Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginBottom: 10}}>{this.props.user.email}</Text>
          <TouchableOpacity onPress={() => this.onPressLogout()}>
            <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>

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
