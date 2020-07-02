import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ratings from 'react-ratings-declarative';
import AddButton from '../buttons/AddButton';
import { getUser } from '../../redux/selectors';
import { connect } from "react-redux";


class DiveSiteReviewsList extends Component {

  render() {
    const { diveSite } = this.props 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    var views = []

    if (diveSite && diveSite.reviews.length > 0) {

      for (var i = 0; i < diveSite.reviews.length; i++) {
        const review = diveSite.reviews[i]
    
        views.push(
          <View key={i} style={{marginBottom: 10, padding: 15, backgroundColor: '#FEFEFE', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 5, shadowColor: '#000'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 5}}>{review.title}</Text>
              <Ratings
                rating={review.rating}
                widgetRatedColors={"#DD0000"}
                widgetDimensions="15px"
                widgetSpacings="1px">
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </View>
            
            <Text style={{fontSize: 14, marginVertical: 20, maxWidth: 500}}>{review.comment}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}} />
              <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{height: 28, width: 18, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
              </View>
              <View style={{marginHorizontal: 10}}>
                <Text style={{fontWeight: '600'}}>{review.user.name}</Text> 
                <Text>{new Date(review.timestamp).toLocaleDateString("en-US", options)}</Text> 
              </View>
            </View>
          </View>
        )
      }
    }
  
    return (
      <View>        
        <View style={{flex: 1}}>
          {views}
        </View>

        <View style={{alignItems: 'center', marginVertical: 20, paddingBottom: 10}}>
          <TouchableOpacity onPress={this.props.openAddReview} style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Text style={{color: '#A00000'}}>Add Review</Text>
            <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/edit.svg')} />
          </TouchableOpacity>
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