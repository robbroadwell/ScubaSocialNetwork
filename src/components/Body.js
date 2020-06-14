import React, {Component} from 'react';
import { View } from 'react-native';

import Map from './map/Map';
import List from './list/List';

class Body extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Map style={this.props.style} diveSites={this.props.diveSites} />
        <List style={this.props.style} diveSites={this.props.diveSites} history={this.props.history} />
      </View>
    )
  }
}

export default Body;