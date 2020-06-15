import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

class PhotosOverlay extends Component {
  render() {
    return (
      <View style={{position: 'absolute', top: 0, width: '100%', height: '100%'}}>
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <View style={{flex: 1, margin: 50, backgroundColor: 'white'}}>
          <TouchableOpacity onPress={() => this.props.history.push(`/photos/`)}>
            <Image style={{height: 25, width: 25, tintColor: 'black'}} source={require('../../assets/close.png')} />
          </TouchableOpacity>
        </View> 
      </View>
    )
  }
}

export default PhotosOverlay;