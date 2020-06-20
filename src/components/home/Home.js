import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import List from '../explore/list/List';
import DestinationCard from '../destinations/DestinationCard';
import MapFilters from '../explore/map/MapFilters';
import PrimaryButton from '../buttons/PrimaryButton';

class Home extends Component {

  navigateDestination = () => {
    this.props.history.push(`/destinations/belize`)
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

        <View style={{margin: 10}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#222222', margin: 10}}>Top Destinations</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5}}>
            <DestinationCard country={"Mexico"} image={require('../../assets/mexico.jpg')} isTop={true} onPress={() => this.props.history.push(`/destinations/belize`)} />
            <DestinationCard country={"Belize"} image={require('../../assets/belize.jpg')} isTop={true} onPress={() => this.props.history.push(`/destinations/belize`)} />
            <DestinationCard country={"Fiji"} image={require('../../assets/fiji.jpg')} isTop={true} onPress={() => this.props.history.push(`/destinations/belize`)} />
            <DestinationCard country={"Australia"} image={require('../../assets/australia.jpeg')} isTop={true} onPress={() => this.props.history.push(`/destinations/belize`)} />
          </View>
        </View>

        <View style={{height: 500, margin: 20}}>
          <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#222222'}}>Explore 4,340 Dive Sites</Text> 
            <View style={{flex: 1}} />
            <MapFilters />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <List style={this.props.style} history={this.props.history} />
            {this.props.map}
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Dive Directory</Text>
          <Text style={{fontSize: 14, color: 'black', marginTop: 2}}>4,340 Dive Sites submitted by users from all over the world. <span style={{textDecorationLine: 'underline'}}>Submit your favorite dive site.</span></Text> 
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={{flexDirection: 'column', marginRight: 20, flex: 1}}>
              <DirectoryLocation country={"Bahamas"} diveCount={24} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Belize"} diveCount={5} onPress={this.navigateDestination} />
                <RegionLocation region={"Lighthouse Reef"} diveCount={2} onPress={this.navigateDestination} />
                <RegionLocation region={"Palancar Reef"} diveCount={3} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Brazil"} diveCount={75} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Cayman Islands"} diveCount={18} onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column', marginRight: 20, flex: 1}}>
              <DirectoryLocation country={"Columbia"} diveCount={18} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Costa Rica"} diveCount={18} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Croatia"} diveCount={92} onPress={this.navigateDestination} />
                <RegionLocation region={"Djbrovnik Area"} diveCount={80} onPress={this.navigateDestination} />
                <RegionLocation region={"Split Area"} diveCount={12} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Cuba"} diveCount={22} onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column', marginRight: 20, flex: 1}}>
              <DirectoryLocation country={"Dominican Republic"} diveCount={24} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Ecuador"} diveCount={5} onPress={this.navigateDestination} />
                <RegionLocation region={"Lighthouse Reef"} diveCount={2} onPress={this.navigateDestination} />
                <RegionLocation region={"Palancar Reef"} diveCount={3} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Egypt"} diveCount={75} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Cayman Islands"} diveCount={18} onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column', marginRight: 0, flex: 1}}>
              <DirectoryLocation country={"Fiji"} diveCount={18} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Greece"} diveCount={18} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Grenada"} diveCount={92} onPress={this.navigateDestination} />
                <RegionLocation region={"Rainbow Reef"} diveCount={80} onPress={this.navigateDestination} />
                <RegionLocation region={"Split Area"} diveCount={12} onPress={this.navigateDestination} />
              <DirectoryLocation country={"Guatamala"} diveCount={22} onPress={this.navigateDestination} />
            </View>
          </View>
        </View>

        <FooterActions />
      </View>
    )
  }
}

function FilterButton({ filter }) {
  return (
    <View style={{borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 7, marginRight: 10}}>
      <Text style={{padding: 10}}>{filter}</Text>
    </View>
  )
}

function DirectoryLocation({ country, diveCount, onPress }) {
  return (
    <View style={{flexDirection: 'row', minWidth: 250, marginBottom: 2}}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#0000A5'}}>{country}</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text numberOfLines={1}>..............................................................................</Text>
      </View>
      <Text>{diveCount} dives</Text>
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

export default Home;