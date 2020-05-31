import React, {Component} from 'react';
import { View } from 'react-native';

class Result extends Component {
  render() {
    if (!this.props.site) {
      return <View></View>
    } else {
      return (
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#EAEAEA'}}>
  
        </View>
      )
    }
  }
}

export default Result