import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import BaseHoverableView from './BaseHoverableView'

class PrimaryButton extends React.Component {
  render() {
    const { action, title, icon, popoverIcon, ...passThrough } = this.props
    return (
      <TouchableOpacity onPress={action} activeOpacity={1.0} style={{marginHorizontal: 5}} >
        <BaseHoverableView
          style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', backgroundColor: this.props.popover ? "#21313C" : "#FFFFFF", borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
          onHover={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', backgroundColor: this.props.popover ? "#21313C" : "#FFFFFF", borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
          >
          <Text style={{color: this.props.popover ? '#FFFFFF' : '#333333', fontWeight: '500'}}>{title}</Text>
          {!icon ? <View></View> :
          <Image style={{width: 18, height: 18, marginLeft: 8, tintColor: this.props.popover ? '#FFFFFF' : '#333333'}} source={icon} />
        }
          
        </BaseHoverableView>
      </TouchableOpacity>
    )
  }
}

export default PrimaryButton