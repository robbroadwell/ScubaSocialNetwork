import React from 'react';
import { View, Image, Text } from 'react-native';
import { StickyContainer } from 'react-sticky';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import LogButton from '../buttons/LogButton';
import EditButton from '../buttons/EditButton';

function DiveSiteDetailSidebar({ diveSite, openLogDive }) {
  return (
    <StickyContainer>
      <View style={{width: 320, flexDirection: 'column'}}>
        {/* <View style={{height: 200, borderColor: '#DDDDDD', borderWidth: 1, margin: 10}}>
          <Image style={{flex: 1}} source={require('../../assets/weather_placeholder2.png')} />
        </View> */}

        <VisibilityCard diveSite={diveSite} openLogDive={openLogDive} />
        <DepthCard diveSite={diveSite} openLogDive={openLogDive} />
        <WaterTemperatureCard diveSite={diveSite} openLogDive={openLogDive} />
        <CurrentsCard diveSite={diveSite} openLogDive={openLogDive} />
        <AccessCard diveSite={diveSite} />
        <DiveTypeCard diveSite={diveSite} />

        {/* <DiveSiteDetailMarketing /> */}
      </View>
    </StickyContainer>
  )
}

function VisibilityCard({ diveSite, openLogDive }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Visibility</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>100+ meters</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function DepthCard({ diveSite, openLogDive }){
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Depth</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '600'}}>Average: 44 ft</Text>
            <Text style={{fontWeight: '600'}}>Max: 78 ft</Text>
          </View>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function WaterTemperatureCard({ diveSite, openLogDive }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Water Temperature</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>80°F</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function CurrentsCard({ diveSite, openLogDive }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Currents</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>None</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function AccessCard({ diveSite }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Access</Text>
          <View style={{flex: 1}} />
          <EditButton />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Text style={{fontWeight: '600'}}>Boat, Liveaboard</Text>
          <View style={{flex: 1}} />
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function DiveTypeCard({ diveSite }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Dive Type</Text>
          <View style={{flex: 1}} />
          <EditButton />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Text style={{fontWeight: '600'}}>Shipwreck</Text>
          <View style={{flex: 1}} />
        </View>
      </ReactPlaceholder>
    </View>
  )
}

export default DiveSiteDetailSidebar;