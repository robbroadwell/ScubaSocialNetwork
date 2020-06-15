import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

class DiveSites extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <DiveSiteContent onPress={() => this.props.history.push(`/dive-sites/5465131546/great-blue-hole`)} />
      </View>
    )
  }
}

function DiveSiteContent({ onPress }) {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <DiveSiteCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function DiveSiteCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 220, height: 200, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </TouchableOpacity>
  )
}

export default DiveSites;