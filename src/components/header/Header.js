import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setAccountMode, setLoginMode, setRegisterMode } from '../../redux/actions';
import PrimaryButton from '../buttons/PrimaryButton';
import AutocompleteSearch from '../search/AutocompleteSearch';
import { withRouter } from 'react-router-dom'

class Header extends Component {

  showLogin = () => {
    if (this.props.user.username) {
      this.props.history.push(`/account`)
      // this.props.setAccountMode(true);
    } else {
      this.props.setRegisterMode(true);
    }
  };

  render() {
    console.log(this.props.user)
    return (
      <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', alignItems: 'center', height: 60}}>
        
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{width: 30, height: 20, marginHorizontal: 15}} source={require('../../assets/flag2.svg')} />
            <Image style={{width: 200, height: 32, marginTop: 2}} source={require('../../assets/logo_light3.svg')} />
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginHorizontal: 30}}>
          <TouchableOpacity onPress={() => this.props.history.push(`/destinations`)}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500', marginRight: 20}}>Destinations</Text>
          </TouchableOpacity>
          
        </View>

        <View style={{flex: 1}}></View>

        <View style={{width: 245, height: '100%', justifyContent: 'center'}}>
          <AutocompleteSearch header={true} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          <PrimaryButton title={this.props.user.firstName ? "Good morning, " + this.props.user.firstName : "Join Diving Collective"} action={this.showLogin} />
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
  { setAccountMode, setLoginMode, setRegisterMode }
)(withRouter(Header));
