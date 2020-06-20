import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import BaseHoverableView from './BaseHoverableView'

class PrimaryButton extends React.Component {
  render() {
    const { action, title, icon, popoverIcon, ...passThrough } = this.props
    return (
      <TouchableOpacity onPress={action} activeOpacity={1.0} style={{marginHorizontal: 5}} >
        <BaseHoverableView
          style={{ backgroundColor: 'red', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5}}
          onHover={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5}}
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