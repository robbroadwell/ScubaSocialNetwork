import React from 'react';
import { View, Image, Text } from 'react-native';
import DiveSiteReviewsList from './DiveSiteReviewsList';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Ratings from 'react-ratings-declarative';

function DiveSiteDetailSidebar({ diveSite, openAddReview }) {
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
    <View style={{width: 450, paddingTop: 30, paddingLeft: 20, paddingRight: 20, marginRight: -10, marginBottom: -10, backgroundColor: '#FAFAFA', flexDirection: 'column', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}>
      {/* <View style={{height: 200, borderColor: '#DDDDDD', borderWidth: 1, margin: 10}}>
        <Image style={{flex: 1}} source={require('../../assets/weather_placeholder2.png')} />
      </View> */}
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 29}}>
        <ReactPlaceholder type='rect' style={{width: 80, height: 20}} ready={diveSite} showLoadingAnimation={true}>
          <Ratings
            rating={rating()}
            widgetRatedColors={"#DD0000"}
            widgetDimensions="20px"
            widgetSpacings="1px">
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </ReactPlaceholder>
        
        <ReactPlaceholder type='rect' style={{width: 70, height: 20}} ready={diveSite} showLoadingAnimation={true}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{Number(rating()).toFixed(2)} ( {reviews()} reviews )</Text>
            {/* {reviews() === 0 ? <View /> : <Image style={{width: 20, height: 20}} source={require('../../assets/drop_down.svg')} />} */}
          </View>
        </ReactPlaceholder>
      </View>
      

      <DiveSiteReviewsList diveSite={diveSite} openAddReview={openAddReview}  />


      {/* <DiveSiteDetailMarketing /> */}
    </View>
  )
}

export default DiveSiteDetailSidebar;