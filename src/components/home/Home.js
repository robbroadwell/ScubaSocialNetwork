import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import List from '../explore/list/List';
import Map from '../explore/map/Map';

class Home extends Component {

  navigateDestination = () => {
    this.props.history.push(`/destinations/mexico`)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={require('../../assets/reef.jpg')} />
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 50, fontWeight: '700', color: 'white'}}>
              Plan your next Scuba adventure
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Get information from fellow divers just like you.
            </Text>
          </View>
          <View style={{width: 400, height: 50, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style={{padding: 20}}>Find dive sites, destinations, etc.</Text>
          </View>
        </View>

        <View style={{height: 500, margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black', marginBottom: 20}}>Explore 4,340 Dive Sites</Text> 
          <View style={{flex: 1, flexDirection: 'row'}}>
            <List style={this.props.style} history={this.props.history} />
            {this.props.map}
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Top Photos</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <TouchableOpacity onPress={() => this.props.history.push(`/dive-sites/5465131546/great-blue-hole`)} style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Dive Directory</Text>
          <Text style={{fontSize: 14, color: 'black', marginTop: 5}}>4,340 Dive Sites submitted by users from all over the world. <span style={{textDecorationLine: 'underline'}}>Submit your favorite dive site.</span></Text> 
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'column', marginRight: 20}}>
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column', marginRight: 20}}>
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column', marginRight: 20}}>
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
            </View>
            <View style={{flexDirection: 'column'}}>
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
              <DirectoryLocation onPress={this.navigateDestination} />
            </View>
          </View>
        </View>

        <FooterActions />
      </View>
    )
  }
}

function FooterActions() {
  return (
    <View style={{margin: 20, marginBottom: 40, borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingTop: 40, flexDirection: 'row', height: 450}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/mobile.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Maps as mobile as you are</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Never lose the trail, even if you lose your cell signal. Our app was designed to work offline.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <View style={{backgroundColor: '#A00000'}}>
            <Text style={{padding: 15, color: 'white'}}>Download the App</Text>
          </View>
        </View>
      </View>
      <View style={{width: 20}} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/you.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Add your favorite dive sites</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Join the thousands of riders who’ve shared their most treasured trails with the MTB Project community.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <View style={{backgroundColor: '#A00000'}}>
            <Text style={{padding: 15, color: 'white'}}>Add a dive site</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function DirectoryLocation({ onPress }) {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#0000A5'}}>Mexico</Text>
      </TouchableOpacity>
      <Text>.........................................</Text>
      <Text>24 dives</Text>
    </View>
  )
}

export default Home;