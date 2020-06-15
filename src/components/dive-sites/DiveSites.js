import React, {Component} from 'react';
import { View, Image, Text } from 'react-native';

class DiveSites extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <DiveSiteContent />
      </View>
    )
  }
}

function DiveSiteContent() {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <DiveSiteCard />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function DiveSiteCard() {
  return (
    <View style={{width: 220, height: 200, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </View>
  )
}

export default DiveSites;