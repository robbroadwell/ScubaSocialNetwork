import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { fetchDestinations, fetchTopDestinations } from "../../redux/actions";
import { getDestinations, getTopDestinations } from '../../redux/selectors';
import { connect } from "react-redux";

import Map from '../explore/map/Map';
import DestinationCard from '../destinations/DestinationCard';
import MapFilters from '../explore/map/MapFilters';
import PrimaryButton from '../buttons/PrimaryButton';

class Home extends Component {

  componentWillMount() {
    this.props.fetchDestinations()
    this.props.fetchTopDestinations()
  }

  navigateDestination = (destination) => {
    this.props.history.push(`/destinations/` + destination._id)
  }

  navigateAddDiveSite = () => {
    this.props.history.push(`/add-dive-site`)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={require('../../assets/reef.jpg')} />
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 50, fontWeight: '700', color: 'white', textShadowColor: '#555555', textShadowRadius: 10}}>
              Plan your next Scuba adventure
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center', textShadowColor: '#333333', textShadowRadius: 10}}>
              Get information from fellow divers just like you.
            </Text>
          </View>
          <View style={{width: 400, height: 50, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style={{padding: 20}}>Find dive sites, destinations, etc.</Text>
          </View>
        </View>

        <Featured destinations={this.props.topDestinations} navigateDestination={this.navigateDestination}  />

        <View style={{height: 500, margin: 20}}>
          <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#222222'}}>Explore 4,340 Dive Sites</Text> 
            <View style={{flex: 1}} />
            {/* <MapFilters /> */}
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Map style={this.props.style} history={this.props.history} />
          </View>
        </View>

        <Directory destinations={this.props.destinations} navigateDestination={this.navigateDestination} addDiveSite={this.navigateAddDiveSite} />

        {/* <FooterActions /> */}
      </View>
    )
  }
}

function Featured({ destinations, navigateDestination }) {
  console.log(destinations)
  var views = []
  var max = 4

  for (var i = 0; i < destinations.length && i < max; i++) {
    views.push(
      <DestinationCard destination={destinations[i]} navigateDestination={navigateDestination} />
    )
  }

  return (
    <View style={{margin: 10}}>
      <Text style={{fontSize: 18, fontWeight: '700', color: '#222222', margin: 10}}>Featured Destinations</Text> 
      <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5}}>
        {views}
      </View>
    </View>
  )
}

function Directory({ destinations, navigateDestination, addDiveSite }) {
  var restrictedList = []
  
  for (var i = 0; i < destinations.length; i++) {
    if (destinations[i].diveSiteCount > 0) {
      restrictedList.push(destinations[i])
    }
  }

  var col1 = []
  var col2 = []
  var col3 = []
  
  for (var i = 0; i < restrictedList.length; i++) {
    if (i < restrictedList.length / 3) {
      col1.push(
        <DirectoryLocation destination={restrictedList[i]} navigateDestination={navigateDestination} />
      )
    } else if (i < (restrictedList.length / 3) * 2) {
      col2.push(
        <DirectoryLocation destination={restrictedList[i]} navigateDestination={navigateDestination} />
      )
    } else {
      col3.push(
        <DirectoryLocation destination={restrictedList[i]} navigateDestination={navigateDestination} />
      )
    }
  }

  return (
    <View style={{margin: 20, marginBottom: 50}}>
      <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Dive Directory</Text>
      <TouchableOpacity onPress={addDiveSite}><Text style={{fontSize: 14, color: 'black', marginTop: 2, textDecorationLine: 'underline', color: "#A00000"}}>Submit your favorite dive site.</Text></TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 1, marginRight: 20}}>
          {col1}
        </View>
        <View  style={{flex: 1, marginRight: 20}}>
          {col2}
        </View>
        <View style={{flex: 1}}>
          {col3}
        </View>
      </View>
    </View>
  
  )
}

function FilterButton({ filter }) {
  return (
    <View style={{borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 7, marginRight: 10}}>
      <Text style={{padding: 10}}>{filter}</Text>
    </View>
  )
}

function DirectoryLocation({ destination, navigateDestination }) {
  return (
    <View style={{flexDirection: 'row', marginBottom: 2}}>
      <TouchableOpacity onPress={() => navigateDestination(destination)}>
        <Text style={{color: '#0000A5'}}>{destination.name}</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text numberOfLines={1}>............................................................................................................................................................</Text>
      </View>
      <Text>{destination.diveSiteCount} dives</Text>
    </View>
  )
}

function RegionLocation({ region, diveCount, onPress }) {
  return (
    <View style={{flexDirection: 'row', minWidth: 250, alignItems: 'center', marginBottom: 2}}>
      <Image style={{height: 10, width: 18, tintColor: '#AAAAAA', marginRight: 5}} source={require('../../assets/region_arrow.svg')} />
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#0000A5', fontSize: 13}}>{region}</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text numberOfLines={1}>..............................................................................</Text>
      </View>
      <Text>{diveCount} dives</Text>
    </View>
  )
}

function FooterActions() {
  return (
    <View style={{margin: 20, marginBottom: 40, borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingTop: 20, flexDirection: 'row', height: 450}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/mobile.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Apps as mobile as you are</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Find dive sites, connect with other divers, or log your dive... anywhere.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <PrimaryButton title={"Download the App"} />
        </View>
      </View>
      <View style={{width: 20}} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/you.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Add your favorite dive sites</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Join the thousands of divers who’ve shared their most loved dive sites.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <PrimaryButton title={"Add a Dive Site"} />
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  const destinations = getDestinations(state);
  const topDestinations = getTopDestinations(state);
  return { destinations, topDestinations };
};

export default connect(
  mapStateToProps,
  { fetchDestinations, fetchTopDestinations }
)(Home);
