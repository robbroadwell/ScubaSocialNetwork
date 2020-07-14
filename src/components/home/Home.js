import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { fetchDestinations, fetchTopDestinations } from "../../redux/actions";
import { getDestinations, getTopDestinations, getFeaturedDestinations } from '../../redux/selectors';
import { connect } from "react-redux";

import AutocompleteSearch from '../search/AutocompleteSearch';
import Map from '../explore/map/Map';
import DestinationCard from '../destinations/DestinationCard';
import MapFilters from '../explore/map/MapFilters';
import PrimaryButton from '../buttons/PrimaryButton';
import StyledLink from '../buttons/StyledLink';

class Home extends Component {
  navigateAddDiveSite = () => {
    this.props.history.push(`/add-dive-site`)
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column-reverse'}}>
        {/* <FooterActions /> */}
        <Directory style={this.props.style} destinations={this.props.destinations} addDiveSite={this.navigateAddDiveSite} />
        <HomeMap style={this.props.style} history={this.props.history} />
        <Featured destinations={this.props.featuredDestinations} />
        <Header style={this.props.style} />
      </View>
    )
  }
}

function Header({ style }) {
  if (style.mobile) {
    return (
      <View>
        <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={require('../../assets/reef.jpg')} />
        <View style={{flex: 1, marginVertical: 100}}>
          <Text style={{fontSize: 40, fontWeight: '700', textAlign: 'center', color: 'white', textShadowColor: '#555555', textShadowRadius: 10}}>
            Plan your next Scuba adventure
          </Text>
          <Text style={{fontSize: 25, marginHorizontal: 20, marginTop: 10, color: 'white', textAlign: 'center', textShadowColor: '#333333', textShadowRadius: 10}}>
            Get information from fellow divers just like you.
          </Text>
          <View style={{margin: 20, alignItems: 'center'}}>
            <AutocompleteSearch />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={require('../../assets/reef.jpg')} />
      <View style={{marginBottom: 70, alignItems: 'center'}}>
        <Text style={{fontSize: 50, fontWeight: '700', color: 'white', textShadowColor: '#555555', textShadowRadius: 10}}>
          Plan your next Scuba adventure
        </Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', textShadowColor: '#333333', textShadowRadius: 10}}>
          Get information from fellow divers just like you.
        </Text>
        <View style={{marginTop: 25, width: 600, alignItems: 'center'}}>
          <AutocompleteSearch />
        </View>
      </View>
    </View>
  )
}

function HomeMap({ style, history }) {
  return (
    <View style={{height: 500, margin: 20}}>
      <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '700', color: '#222222'}}>Explore 4,340 Dive Sites</Text> 
        <View style={{flex: 1}} />
        {/* <MapFilters /> */}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Map style={style} history={history} />
      </View>
    </View>
  )
}

function Featured({ destinations}) {
  console.log(destinations)
  var views = []
  var max = 4

  for (var i = 0; i < destinations.length && i < max; i++) {
    views.push(
      <DestinationCard key={i} destination={destinations[i]} />
    )
  }

  return (
    <View style={{margin: 10}}>
      <Text style={{fontSize: 18, fontWeight: '700', color: '#222222', margin: 10, marginBottom: 5}}>Featured Destinations</Text> 
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 5}}>
        {views}
      </View>
    </View>
  )
}

function Directory({ destinations, style }) {
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
    if (style.mobile) {
      col1.push(
        <DirectoryLocation key={i} destination={restrictedList[i]} />
      )
      continue
    }

    if (i < restrictedList.length / 3) {
      col1.push(
        <DirectoryLocation key={i} destination={restrictedList[i]} />
      )
    } else if (i < (restrictedList.length / 3) * 2) {
      col2.push(
        <DirectoryLocation key={i} destination={restrictedList[i]} />
      )
    } else {
      col3.push(
        <DirectoryLocation key={i} destination={restrictedList[i]} />
      )
    }
  }

  return (
    <View style={{margin: 20, marginBottom: 20}}>
      <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Dive Directory</Text>
      <View style={{flexDirection: 'row', marginTop: 2}}>
        <Text style={{fontSize: 14, color: 'black'}}>4,340 dive sites added by users from all over the world. </Text>
        <StyledLink to="/add-dive-site" style={{fontSize: 14}}>Submit your favorite dive site.</StyledLink>
      </View>
      {style.mobile ? <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 1, marginRight: 20}}>
          {col1}
        </View>
      </View> 
      : 
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 1, marginRight: 20}}>
          {col1}
        </View>
        <View style={{flex: 1, marginRight: 20}}>
          {col2}
          </View>
        <View style={{flex: 1}}>
          {col3}
        </View>
      </View>
      }
      
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

function DirectoryLocation({ destination }) {
  return (
    <View style={{flexDirection: 'row', marginBottom: 2}}>
      <StyledLink to={`/destinations/` + destination._id} style={{fontSize: 14}}>{destination.name}</StyledLink>
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
  const featuredDestinations = getFeaturedDestinations(state);
  return { destinations, topDestinations, featuredDestinations };
};

export default connect(
  mapStateToProps,
  { fetchDestinations, fetchTopDestinations }
)(Home);
