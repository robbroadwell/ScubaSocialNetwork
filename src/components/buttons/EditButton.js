import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import BaseHoverableView from './BaseHoverableView'

class EditButton extends React.Component {
  render() {
    const { action, title, icon, popoverIcon, ...passThrough } = this.props
    return (
      <TouchableOpacity onPress={action} activeOpacity={1.0} style={{marginHorizontal: 5, flexDirection: 'row'}} >
        <Text style={{color: '#A00000', marginLeft: 10}}>Add</Text>    
        <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/edit.svg')} />
      </TouchableOpacity>
    )
  }
}

export default EditButton;