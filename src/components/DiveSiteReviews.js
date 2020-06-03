import React from 'react';
import { View, Text } from 'react-native';
import Ratings from 'react-ratings-declarative';

function DiveSiteReviews({ reviews, rating, changeRating, userModified }) {
  return (
    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <Ratings
          rating={rating}
          widgetRatedColors={userModified ? "#FFB400" : "DD0000"}
          widgetDimensions="14px"
          widgetSpacings="1px"
          changeRating={(rating) => changeRating(rating)}>
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
        </Ratings>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{(Math.round(rating * 100) / 100).toFixed(2)}</Text>
            <Text style={{marginLeft: 5}}>({reviews} review{reviews == 1 ? '' : 's'})</Text>
        </View>
      </View>
    </View>
  )
}

export default DiveSiteReviews;
