import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import PrimaryButton from '../../utility/buttons/PrimaryButton';

class Header extends Component {

  render() {
    return (
      <View style={{backgroundColor: this.props.style.colors.secondary, flexDirection: 'row', alignItems: 'center', height: 55, borderBottomWidth: 1, borderColor: this.props.style.colors.borders}}>
        
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{width: 30, height: 20, marginHorizontal: 15}} source={require('../../assets/flag2.svg')} />
            <Image style={{width: 160, height: 25, marginTop: 2}} source={require('../../assets/logo_27.svg')} />
          </View>
        </TouchableOpacity>

        <View style={{flex: 1}} ></View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          <PrimaryButton title={"Login"} />
        </View>
      </View>
    )
  }
}

export default Header;