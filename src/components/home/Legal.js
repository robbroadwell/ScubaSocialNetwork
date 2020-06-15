import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Legal() {
  return (
    <View style={{marginTop: 30, marginBottom: 60}}>
      <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#DDDDDD'}}>© 2020, Broadwell LLC, or its affiliates</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Conditions of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Privacy Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
          <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Legal;