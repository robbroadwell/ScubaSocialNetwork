import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DiveSiteReviews from './DiveSiteReviews';
import BaseHoverableView from '../../buttons/BaseHoverableView';

class DiveSiteCard extends Component {

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
              style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', marginBottom: 0, padding: this.props.selected ? 9 : 10, backgroundColor: this.props.selected ? "21313C" : '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
              onHover={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', marginBottom: 0,  padding: this.props.selected ? 9 : 10, backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
            >

            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 20}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{this.props.site.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 2}}>
                  <Text style={{fontSize: 13}}>{this.props.site.country} </Text>
                  {/* <Text style={{fontSize: 13}}>{ Number((this.props.site.location.coordinates[1]).toFixed(4))}, {Number((this.props.site.location.coordinates[0]).toFixed(4))}</Text> */}
                </View>
              </View>
              <DiveSiteReviews reviews={this.reviews()} rating={this.rating()} />
            </View>
          </BaseHoverableView>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DiveSiteCard;
