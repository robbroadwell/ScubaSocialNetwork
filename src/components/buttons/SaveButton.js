import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native';

function SaveButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
      <Text style={{color: '#A00000'}}>Save</Text>
      <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/edit.svg')} />
    </TouchableOpacity>
  )
}

export default SaveButton;