import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Ratings from 'react-ratings-declarative';
import AddButton from '../buttons/AddButton';
import { getUser } from '../../redux/selectors';
import { connect } from "react-redux";


class DiveSiteReviewsList extends Component {

  render() {
    const { diveSite } = this.props 

    var views = []

    if (diveSite && diveSite.reviews.length > 0) {

      for (var i = 0; i < diveSite.reviews.length; i++) {
        const review = diveSite.reviews[i]
    
        views.push(
          <View key={i} style={{flexBasis: '49.5%', marginVertical: 5, padding: 20, backgroundColor: '#FEFEFE', borderColor: '#DDDDDD', borderWidth: 1, alignItems: 'center'}}>
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
              <Text style={{fontSize: 16, marginBottom:2}}>{review.user.name}</Text>
              <Text style={{fontSize: 14, fontWeight: '300'}}>{new Date(review.timestamp).toLocaleDateString("en-US")}</Text>
            </View>
          </View>
        )
      }
    }

    console.log(views)
  
    return (
      <View>
        <View style={{marginVertical: 20}}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={{flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Reviews</Text>
              <AddButton onPress={this.props.openAddReview} />
            </View>
          </View>

          {diveSite && diveSite.reviews && diveSite.reviews.length > 0 ? <View /> : <Text>No Reviews Yet.</Text>}
          
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {views}
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  {  }
)(DiveSiteReviewsList);