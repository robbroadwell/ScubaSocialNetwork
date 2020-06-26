import React from 'react';
import { View, Text, Image } from 'react-native';
import Ratings from 'react-ratings-declarative';

function DiveSiteReviewsList({ diveSite }) {
  if (!diveSite || diveSite.reviews.length === 0) {
    return (
      <View style={{marginBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Reviews</Text>
            <Text style={{color: '#A00000', marginLeft: 10}}>Add</Text>
            <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/edit.svg')} />
          </View>
        </View>
        <Text>No Reviews Yet.</Text>
      </View>
    )
  }

  var views = []
  for (var i = 0; i < diveSite.reviews.length; i++) {
    const review = diveSite.reviews[i]

    views.push(
      <View key={i} style={{flex: 1, marginHorizontal: 5, marginVertical: 5, padding: 20, minWidth: 300, backgroundColor: '#FEFEFE', borderColor: '#DDDDDD', borderWidth: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 22, marginBottom: 5}}>{review.title}</Text>
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
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%'}}>
          <Text style={{fontSize: 16, marginBottom:2}}>{review.user}</Text>
          <Text style={{fontSize: 14, fontWeight: '300'}}>{new Date(review.timestamp).toLocaleDateString("en-US")}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
      <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Reviews</Text>
        <Text style={{color: '#A00000', marginLeft: 10}}>Add</Text>
        <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/edit.svg')} />
      </View>
      {views}
    </View>
  )
}

export default DiveSiteReviewsList;