import React, {Component} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

class Animals extends Component {
  render() {
    return (
      <View style={{marginTop: 10}}>
        <AnimalsContent onPress={() => this.props.history.push(`/animals/sharks/white-tip`)} />
      </View>
    )
  }
}

function AnimalsContent({ onPress }) {
  const count = 20;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <AnimalsCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function AnimalsCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}  style={{width: 220, height: 200, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </TouchableOpacity>
  )
}

export default Animals;