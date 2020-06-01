import React, {Component} from 'react';
import { View, Text } from 'react-native';
import qs from 'qs';

class Result extends Component {
  render() {
    return (
      <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
        <Text>{qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}</Text>
      </View>
    )
  }
}

export default Result