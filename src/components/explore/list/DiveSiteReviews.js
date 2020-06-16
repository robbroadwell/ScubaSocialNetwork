import React from 'react';
import { View, Text } from 'react-native';
import Ratings from 'react-ratings-declarative';

function DiveSiteReviews({ reviews, rating, changeRating, userModified }) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Ratings
        rating={rating}
        widgetRatedColors={userModified ? "#FFB400" : "DD0000"}
        widgetDimensions="14px"
        widgetSpacings="1px">
        <Ratings.Widget widgetHoverColor="#FFB400"  />
        <Ratings.Widget widgetHoverColor="#FFB400"  />
        <Ratings.Widget widgetHoverColor="#FFB400"  />
        <Ratings.Widget widgetHoverColor="#FFB400"  />
        <Ratings.Widget widgetHoverColor="#FFB400"  />
      </Ratings>
      
      <Text style={{marginLeft: 10}}>{(Math.round(rating * 100) / 100).toFixed(1)} ( {reviews} )</Text>
    </View>
  )
}

export default DiveSiteReviews;
