import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Ratings from 'react-ratings-declarative';
import StyledLink from '../buttons/StyledLink';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

function DiveSiteDetailHeader({ diveSite }) {

  function rating() {
    if (!diveSite || !diveSite.reviews || diveSite.reviews.length === 0) {
      return 0
    }

    var total = 0;
    var x;

    for (x in diveSite.reviews) {
      total = total + diveSite.reviews[x].rating
    }

    return total / diveSite.reviews.length
  }

  function reviews() {
    if (!diveSite || !diveSite.reviews) {
      return 0
    }
    return diveSite.reviews.length
  }

  return (
    <View style={{margin: 20, marginBottom: 10}}>
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
        <ReactPlaceholder type='rect' style={{width: 80, height: 20}} ready={diveSite} showLoadingAnimation={true}>
          <Ratings
            rating={rating()}
            widgetRatedColors={"#DD0000"}
            widgetDimensions="15px"
            widgetSpacings="1px">
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </ReactPlaceholder>
        
        <ReactPlaceholder type='rect' style={{width: 70, height: 20}} ready={diveSite} showLoadingAnimation={true}>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <Text style={{fontSize: 16}}>{Number(rating()).toFixed(2)} ( {reviews()} reviews )</Text>
            {/* {reviews() === 0 ? <View /> : <Image style={{width: 20, height: 20}} source={require('../../assets/drop_down.svg')} />} */}
          </View>
        </ReactPlaceholder>

        <ReactPlaceholder type='rect' style={{width: 400, height: 20}} ready={diveSite} showLoadingAnimation={true}>
          {!diveSite ? <View></View> :

          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
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
  )
}

export default DiveSiteDetailHeader;