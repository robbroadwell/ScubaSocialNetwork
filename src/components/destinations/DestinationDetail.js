import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import List from '../explore/list/List';
import Map from '../explore/map/Map';

class DestinationDetail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height: 500, margin: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: '700', color: 'black'}}>Mexico</Text>
            <View style={{marginLeft: 15, justifyContent: 'center'}}>
              <View style={{backgroundColor: '#A00000'}}>
                <Text style={{padding: 5, color: 'white'}}>TOP</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Destinations</Text>
            <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
            <Text style={{fontSize: 15}}>Mexico</Text>
            <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
            <Text style={{fontSize: 15}}>View Regions</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <List style={this.props.style} />
            <Map style={this.props.style} />
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Top Photos in Mexico</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View>

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Animal Sightings in Mexico</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View> */}
      </View>
    )
  }
}

export default DestinationDetail;