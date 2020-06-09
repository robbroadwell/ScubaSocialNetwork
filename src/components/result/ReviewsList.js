import React from 'react';
import { View, Text } from 'react-native';
import Ratings from 'react-ratings-declarative';

function ReviewsList({ reviews }) {
  var views = []
  for (var i = 0; i < reviews.length; i++) {
    const review = reviews[i]

    views.push(
      <View style={{flex: 1, margin: 10, padding: 20, minWidth: 300, backgroundColor: '#F6F6F6', alignItems: 'center'}}>
        <Text style={{fontSize: 24, marginBottom: 10}}>{review.title}</Text>
        <Ratings
          rating={review.rating}
          widgetRatedColors={"#DD0000"}
          widgetDimensions="22px"
          widgetSpacings="1px">
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
        <Text style={{fontSize: 14, marginVertical: 10, maxWidth: 500}}>{review.comment}</Text>
        <Text style={{fontSize: 16, marginBottom:2}}>{review.user}</Text>
        <Text style={{fontSize: 14, fontWeight: '300'}}>{new Date(review.timestamp).toLocaleDateString("en-US")}</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', margin: -10, marginBottom: 20}}>
      {views}
    </View>
  )
}

export default ReviewsList;