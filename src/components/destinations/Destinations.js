import React, {Component} from 'react';
import { View, Image, Text } from 'react-native';

class Destinations extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <DestinationContent />
      </View>
    )
  }
}

function DestinationContent() {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <DestinationCard />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function DestinationCard() {
  return (
    <View style={{width: 220, height: 200, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </View>
  )
}

export default Destinations;