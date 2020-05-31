import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';


class Footer extends Component {
  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 30, borderTopWidth: 1, borderColor: "#DDDDDD"}}>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Version 0.3.1 (39)</Text>
        <View style={{flex: 1}} />
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Report a Problem</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Request a Feature</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Privacy</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Terms of Use</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>© 2020, ScubaSoft Inc., or its affiliates</Text>
      </View>
    )
  }
}

export default Footer;
