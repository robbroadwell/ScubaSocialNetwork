import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import List from '../explore/list/List';
import StyledLink from '../buttons/StyledLink';
import PhotosContent from '../photos/PhotosContent';
import MapFilters from '../explore/map/MapFilters';

class DestinationDetail extends Component {
  render() {
    console.log(this.props.match.params)
    return (
      <View style={{flex: 1}}>

        <View style={{height: 500, margin: 20}}>
          <View style={{flexDirection: 'row'}}>

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontWeight: '700', color: 'black'}}>Belize</Text>
                <View style={{marginLeft: 15, justifyContent: 'center'}}>
                  <View style={{backgroundColor: '#A00000'}}>
                    <Text style={{padding: 5, color: 'white'}}>TOP</Text>
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                <StyledLink to="/destinations">Destinations</StyledLink>
                <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                {this.props.match.params.idRegion ? <StyledLink to="/destinations/belize">Belize</StyledLink> : <Text style={{fontSize: 16}}>Belize</Text>}
                {/* <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                {this.props.match.params.idRegion ? <Text style={{fontSize: 16}}>Lighthouse Reef</Text> : <StyledLink to="/destinations/belize/lighthouse-reef">Select Region</StyledLink>} */}
              </View>
            </View>
            
            {/* <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <MapFilters />
            </View> */}
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <List style={this.props.style} history={this.props.history} />
            {this.props.map}
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 1}} />
            <Text style={{marginRight: 5}}>Are we missing something?</Text>
            <Text style={{textDecorationLine: 'underline', color: '#A00000'}}>Add a dive site</Text>
          </View>
        </View>

        <View style={{margin: 20, marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black', marginBottom: 10}}>Recent Photos in Belize</Text> 
          <PhotosContent />
        </View>

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Animals Seen in Belize</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View> */}

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Top Liveaboards in Belize</Text> 
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>
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