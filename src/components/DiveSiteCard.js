import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DiveSiteReviews from './DiveSiteReviews';
import BaseHoverableView from './buttons/BaseHoverableView';

class DiveSiteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.rating(),
      userModified: false,
      editMode: false
    };
  }

  componentWillReceiveProps() {
    this.setState({
      rating: this.rating(),
      userModified: false
    });
  }

  changeRating = (newRating) => {
    console.log(newRating)
    this.setState({
      rating: newRating,
      userModified: true
    });
  }

  rating = () => {
    if (!this.props || !this.props.site || !this.props.site.reviews || this.props.site.reviews.length === 0) {
      return 0
    }

    var total = 0;
    var x;

    for (x in this.props.site.reviews) {
      total = total + this.props.site.reviews[x].rating
    }

    return total / this.props.site.reviews.length
  }

  reviews = () => {
    if (!this.props || !this.props.site || !this.props.site.reviews) {
      return 0
    }
    return this.props.site.reviews.length
  }

  render() {
    return (
      <View>
          <TouchableOpacity onPress={this.props.onPress} activeOpacity={1.0} >
            <BaseHoverableView
              style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', margin: 5, marginBottom: 0, paddingHorizontal: this.props.selected ? 11 : 12, paddingVertical: this.props.selected ? 9 : 10, backgroundColor: this.props.selected ? "21313C" : '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
              onHover={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', margin: 5, marginBottom: 0, paddingHorizontal: this.props.selected ? 11 : 12, paddingVertical: this.props.selected ? 9 : 10, backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
            >

            <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>{this.props.site.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                    <Text style={{fontSize: 14}}>{this.props.site.country}, </Text>
                    <Text style={{fontSize: 13}}>{ Number((this.props.site.location.coordinates[1]).toFixed(5))}, {Number((this.props.site.location.coordinates[0]).toFixed(5))}</Text>
                  </View>
                </View>
                <DiveSiteReviews reviews={this.reviews()} rating={this.state.rating} changeRating={(rating) => this.changeRating(rating)} userModified={this.state.userModified} />
            </View>
          </BaseHoverableView>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DiveSiteCard;
