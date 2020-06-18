import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

class Destinations extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <DestinationContent onPress={() => this.props.history.push(`/destinations/belize`)} />
      </View>
    )
  }
}

function DestinationContent({ onPress }) {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <DestinationCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function DestinationCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 220, height: 200, marginBottom: 10}}>
      <ReactPlaceholder type='rect' showLoadingAnimation={true} style={{flex: 1}} />
    </TouchableOpacity>
  )
}

export default Destinations;