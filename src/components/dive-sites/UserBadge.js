import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useHistory } from "react-router-dom";

function UserBadge({ user, timestamp }) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let history = useHistory();

  return (
    <TouchableOpacity onPress={() => history.push('/users/Rob')} style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{height: 28, width: 18, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{fontWeight: '600'}}>{user.name}</Text> 
        <Text>{new Date(timestamp).toLocaleDateString("en-US", options)}</Text> 
      </View>
    </TouchableOpacity>
  )
}

export default UserBadge;