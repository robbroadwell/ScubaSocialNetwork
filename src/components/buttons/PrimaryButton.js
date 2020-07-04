import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import BaseHoverableView from './BaseHoverableView'

class PrimaryButton extends React.Component {
  render() {
    const { action, title, icon, popoverIcon, ...passThrough } = this.props
    return (
      <TouchableOpacity onPress={action} activeOpacity={1.0} style={{marginHorizontal: 2}} >
        <BaseHoverableView
          style={{ backgroundColor: 'red', paddingVertical: 11, paddingHorizontal: 15, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}
          onHover={{ flexDirection: 'row', paddingVertical: 11, paddingHorizontal: 15, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}
          >
          <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 16}}>{title}</Text>
          {!icon ? <View></View> :
          <Image style={{width: 18, height: 18, marginLeft: 8, tintColor: this.props.popover ? '#FFFFFF' : '#333333'}} source={icon} />
        }
          
        </BaseHoverableView>
      </TouchableOpacity>
    )
  }
}

export default PrimaryButton