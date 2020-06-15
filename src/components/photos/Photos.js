import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class Photos extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <PhotosContent onPress={() => this.props.history.push(`/photos/418596049`)} />
      </View>
    )
  }
}

function PhotosContent({ onPress }) {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <PhotosCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function PhotosCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 220, height: 200, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </TouchableOpacity>
  )
}

export default Photos;