import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ratings from 'react-ratings-declarative';
import AddButton from '../buttons/AddButton';
import { getUser } from '../../redux/selectors';
import { connect } from "react-redux";
import UserBadge from './UserBadge';
import { Link } from 'react-router-dom';
import StyledLinkNone from '../buttons/StyledLinkNone';

class DiveSiteReviewsList extends Component {

  render() {
    const { diveSite } = this.props 

    var views = []

    if (diveSite && diveSite.reviews && diveSite.reviews.length > 0) {

      for (var i = 0; i < diveSite.reviews.length; i++) {
        const review = diveSite.reviews[i]
    
        views.push(
          <View key={i} style={{marginBottom: 10, paddingVertical: 15, paddingHorizontal: 25, borderBottomColor: '#DEDEDE', borderBottomWidth: 1}}>

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
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                {/* <Image style={{width: 20, height: 20, marginRight: 3}} source={require('../../assets/heart_outline.svg')} />
                <Text style={{fontSize: 15, fontWeight: '800', marginBottom: 2}}>24</Text> */}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginRight: -10}}>
                <View style={{flex: 1}} />
                {/* <StyledLinkNone to={`/users/${review.user.name}`}> */}
                  <UserBadge user={review.user} timestamp={review.timestamp} />
                {/* </StyledLinkNone> */}
              </View>
            </View>
          </View>
        )
      }
    }
  
    return (
      <View style={{marginTop: 22}}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10, marginBottom: 5}}>
          <Text style={{fontWeight: '600'}}>Top Reviews</Text>  
          <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../assets/drop_down.svg')} />
        </View>         */}
        <View style={{flex: 1, borderTopWidth: 1, borderTopColor: '#DEDEDE'}}>
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