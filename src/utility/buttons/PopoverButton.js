import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import PrimaryButton from './PrimaryButton'

class PopoverButton extends React.Component {
  render() {
    const { ...passThrough } = this.props
    if (!this.props.popover) {
      return (
        <PrimaryButton {...passThrough} />
      )
    }

    return (
      <View>
         <PrimaryButton {...passThrough} />
         <View {...this.props} />
      </View>
    )
  }
}

export default PopoverButton