import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Ratings from 'react-ratings-declarative';

class DiveSiteDetail extends Component {
  render() {
    return (
      <View>
        <View style={{margin: 20}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: '700', color: 'black'}}>The Great Blue Hole</Text>
            <View style={{marginLeft: 15, justifyContent: 'center'}}>
              <View style={{backgroundColor: '#A00000'}}>
                <Text style={{padding: 5, color: 'white'}}>TOP</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>

            <Ratings
              rating={4.5}
              widgetRatedColors={"#DD0000"}
              widgetDimensions="15px"
              widgetSpacings="1px">
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>

            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Text>4.5 ( 75 )</Text>
              <Image style={{width: 20, height: 20}} source={require('../../assets/drop_down.svg')} />
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Text style={{fontSize: 15}}>Destinations</Text>
              <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
              <Text style={{fontSize: 15}}>Belize</Text>
              <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
              <Text style={{fontSize: 15}}>Lighthouse Reef</Text>
              <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
              <Text style={{fontSize: 15}}>The Great Blue Hole</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <Image style={{flex: 1, height: 400, margin: 10}} source={require('../../assets/blue-hole-belize.jpg')} />
          <View style={{flexDirection: 'column'}}>
            <View style={{width: 300, height: 285, borderColor: '#DDDDDD', borderWidth: 1, margin: 10}}>
              <Image style={{flex: 1}} source={require('../../assets/weather_placeholder.png')} />
            </View>
            <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1}}>
              <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>Visibility</Text>
                <Text>Update</Text>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
                <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
                <Text style={{fontWeight: '600'}}>100+ meters</Text>
                <View style={{flex: 1}} />
                <Text>See history</Text>
              </View>
            </View>
            <Text style={{fontSize: 18, fontWeight: '600', marginTop: 40, marginBottom: 5, textAlign: 'center'}}>Ready to go?</Text>
            <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
              <Text style={{fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Flights from $2,000</Text>
            </View>
            <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
              <Text style={{fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Hotels from $120 per night</Text>
            </View>
            <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
              <Text style={{fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Liveaboards from $154 per night</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default DiveSiteDetail;