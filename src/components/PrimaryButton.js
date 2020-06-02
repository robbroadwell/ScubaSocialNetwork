import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import BaseHoverableView from './BaseHoverableView'

class PrimaryButton extends React.Component {
  render() {
    const { title, icon, ...passThrough } = this.props
    return (
      <TouchableOpacity activeOpacity={1.0} style={{marginHorizontal: 5}} >
        <BaseHoverableView
          style={{ flexDirection: 'row', padding: 10, borderRadius: 8, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
          onHover={{ flexDirection: 'row', padding: 10, borderRadius: 8, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
          >
          <Text>{title}</Text>
          <Image style={{width: 20, height: 20, marginLeft: 5}} source={icon} />
        </BaseHoverableView>
      </TouchableOpacity>
    )
  }
}

export default PrimaryButton