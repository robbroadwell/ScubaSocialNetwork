import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Sticky } from 'react-sticky';

class DiveSiteDetailMarketing extends Component {
  render() {
    return (
    <Sticky topOffset={665}>
      {({ style }) => (
        <View style={style}>
        {/* <View style={{position: this.state.fixed ? 'absolute' : 'relative', top: this.state.positionY}} ></View> */}
          <Text style={{fontSize: 18, fontWeight: '600', marginTop: 30, marginBottom: 5, textAlign: 'center'}}>Ready to go?</Text>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Flights from $2,000</Text>
          </View>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Hotels from $120 per night</Text>
          </View>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Liveaboards from $154 per night</Text>
          </View>
          {/* <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: '#A00000', fontSize: 15, fontWeight: '600', margin: 20, marginVertical: 50, textAlign: 'center'}}>Featured Dive Operator</Text>
          </View> */}
        </View>
      )}
    </Sticky>
    )
  }
}

export default DiveSiteDetailMarketing;