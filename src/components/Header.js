import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import { setAddDiveSiteMode } from '../redux/actions';

class Header extends Component {
  onPressAdd = () => {
    if (!this.props.user.username) {
      this.props.openLogin()
    } else {
      this.props.setAddDiveSiteMode(true);
    }
  }

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 70, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <Image style={{width: 50, height: 32, margin: 15, marginLeft: 20}} source={require('../assets/flag2.svg')} />
        <Image style={{width: 130, height: 55, margin: 5}} source={require('../assets/logo_dark.svg')} />

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
          <TouchableOpacity onPress={this.onPressAdd} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 10, color: '#333333'}}>Add Dive Site</Text>
            <Image style={{height: 20, width: 20, tintColor: '#333333'}} source={require('../assets/add.svg')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.enableLoginMode} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>{
                this.props.user.username ? this.props.user.username : 'Login'
            }</Text>
            <Image style={{height: 20, width: 20, tintColor: '#333333'}} source={require('../assets/drop_down.svg')} />
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
  { setAddDiveSiteMode }
)(Header);
