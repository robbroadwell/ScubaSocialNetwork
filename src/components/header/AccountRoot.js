import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from "react-redux";
import { getAccountMode, getLoginMode, getRegisterMode } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'

import Account from './Account';
import Login from './Login';
import Register from './Register';

class AccountRoot extends Component {
  render() {

    console.log("accountMode:" + this.props.accountMode)
    console.log("loginMode:" + this.props.loginMode)
    console.log("registerMode:" + this.props.registerMode)

    if (this.props.accountMode) {
      return <Account />
    }

    if (this.props.loginMode) {
      return <Login />
    }
    
    if (this.props.registerMode) {
      return <Register />
    }

    return <View></View>
  }
}

const mapStateToProps = state => {
  const accountMode = getAccountMode(state);
  const loginMode = getLoginMode(state);
  const registerMode = getRegisterMode(state);
  return { accountMode, loginMode, registerMode };
};

  export default connect(
    mapStateToProps,
    {  }
  )(withRouter(AccountRoot));
