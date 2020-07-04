import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from "react-redux";
import { getAccountMode, getLoginMode, getRegisterMode } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'

// import Account from '../account/Account';
import Login from './Login';
import Register from './Register';

class AccountRoot extends Component {
  render() {

    // if (this.props.accountMode) {
    //   window.scrollTo(0, 0)
    //   return <Account />
    // }

    if (this.props.loginMode) {
      window.scrollTo(0, 0)
      return <Login />
    }
    
    if (this.props.registerMode) {
      window.scrollTo(0, 0)
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
