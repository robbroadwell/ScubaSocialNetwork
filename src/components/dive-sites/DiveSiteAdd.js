import React, {Component} from 'react';
import { View } from 'react-native';
import Map from '../explore/map/Map';
import DiveSiteAddView from './DiveSiteAddView';

class DiveSiteAdd extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', height: '80vh'}}>
        <Map style={this.props.style} diveSites={this.props.diveSites} addDiveSite={true} hideList={true} />
        <DiveSiteAddView history={this.props.history} />
      </View>
    )
  }
}

export default DiveSiteAdd;