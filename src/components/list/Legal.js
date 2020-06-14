import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Legal() {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#333333'}}>© 2020, Broadwell LLC, or its affiliates</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Conditions of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Privacy Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Legal;