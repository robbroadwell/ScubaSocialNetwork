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

          <View style={{flexDirection: 'row', marginTop: 5, marginVertical: 10}}>
            <View style={{width: 200, justifyContent: 'center', alignItems: 'center'}}>
              {/* <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Dive Sites</Text>  */}
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Country</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Region</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Visibility</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Depth</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Water Temperature</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Currents</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Access</Text>
            </View>
            <View style={{borderColor: '#DDDDDD', borderWidth: 1, marginRight: 10}}>
              <Text style={{padding: 10}}>Animal Sightings</Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <List style={this.props.style} history={this.props.history} />
            {this.props.map}
          </View>
        </View>

        <View style={{margin: 20}}>
          {/* <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Recent Photos in Mexico</Text>  */}
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Top Liveaboards in Mexico</Text> 
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>
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