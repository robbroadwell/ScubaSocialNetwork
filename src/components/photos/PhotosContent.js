import React, {Component} from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

function PhotosContent({ onPress, count }) {
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
    <TouchableOpacity onPress={onPress} style={{flex: 1, margin: 5, minWidth: 250, minHeight: 200}}>
      <ReactPlaceholder type='rect' showLoadingAnimation={true} style={{flex: 1}} />
    </TouchableOpacity>
  )
}

export default PhotosContent;