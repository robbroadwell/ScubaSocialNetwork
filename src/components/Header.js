import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";

class Header extends Component {
  render() {
    return (
      <View style={{backgroundColor: "#1d1d1e", flexDirection: 'row', alignItems: 'center', height: 80}}>
        <Image style={{width: 50, height: 32, margin: 15, marginLeft: 20}} source={require('../assets/flag2.svg')} />
        <Image style={{width: 130, height: 55, margin: 5}} source={require('../assets/logo_alt5.svg')} />

        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.props.enableLoginMode}>
            <Text style={{textAlign: 'right', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>{
                this.props.user.username ? this.props.user.username : 'Login'
            }</Text>
          </TouchableOpacity>
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
  {  }
)(Header);
