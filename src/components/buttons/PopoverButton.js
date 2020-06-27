import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import EditButton from './EditButton'

class PopoverButton extends React.Component {
  render() {
    const { ...passThrough } = this.props
    if (!this.props.popover) {
      return (
        <EditButton {...passThrough} />
      )
    }

    return (
      <View>
         <EditButton {...passThrough} />
         <View {...this.props} />
      </View>
    )
  }
}

export default PopoverButton