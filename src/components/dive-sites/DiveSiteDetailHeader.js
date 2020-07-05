import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import StyledLink from '../buttons/StyledLink';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Ratings from 'react-ratings-declarative';

function DiveSiteDetailHeader({ diveSite }) {

  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <ReactPlaceholder type='rect' style={{width: 300, height: 35}} ready={diveSite} showLoadingAnimation={true}>
              <Text style={{fontSize: 30, fontWeight: '700', color: 'black'}}>{!diveSite ? "Loading" : diveSite.name}</Text>
            </ReactPlaceholder>
            {!diveSite || !diveSite.isTop ? <View/> : 
            <View style={{marginLeft: 15, justifyContent: 'center'}}>
              <View style={{backgroundColor: '#A00000'}}>
                <Text style={{padding: 5, color: 'white'}}>TOP</Text>
              </View>
            </View>
            }
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            
            <ReactPlaceholder type='rect' style={{width: 400, height: 20}} ready={diveSite} showLoadingAnimation={true}>
              {!diveSite || !diveSite.destination ? <View></View> :

              <View style={{flexDirection: 'row', marginRight: 10}}>
                <StyledLink to="/destinations">Destinations</StyledLink>
                <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                <StyledLink to={`/destinations/${diveSite.destination.id}`}>{diveSite.destination.name}</StyledLink>
                
                {!diveSite.region ? <View/> : 
                <View style={{flexDirection: 'row'}}>
                  <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                  <StyledLink to={`/destinations/${diveSite.region.id}`}>{diveSite.region.name}</StyledLink>
                </View>
                }
                
                <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                <Text style={{fontSize: 16}}>{diveSite.name}</Text>
              </View>
              }
              
            </ReactPlaceholder>
          </View>
        </View>
        <View style={{flex: 1}} />
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 10}}>Submitted by</Text>
          <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{height: 28, width: 18, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{fontWeight: '600'}}>Rob</Text> 
            <Text>January 20, 2020</Text> 
          </View>
        </View> */}
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <HeaderTag title="Night" />
          <HeaderTag title="Pinnacle" />
        </View>
      </View>
    </View>
  )
}

function HeaderTag({ title }) {
  return (
    <View style={{paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 5, borderRadius: 5, borderWidth: 1, borderColor: '#CCCCCC'}}>
      <Text style={{fontSize: 16, fontWeight: '500'}}>{title}</Text>
    </View>
  )
}

export default DiveSiteDetailHeader;