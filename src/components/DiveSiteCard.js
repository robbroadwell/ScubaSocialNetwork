import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ratings from 'react-ratings-declarative';

class DiveSiteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.rating(),
      userModified: false
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

          <View style={{margin: 3, marginBottom: 0, padding: 13, backgroundColor: '#FEFEFE', shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 5}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.props.onPress} activeOpacity={1.0}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.site.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                      <Text style={{fontSize: 14, fontWeight: 'bold'}}>{this.props.site.country}, </Text>
                      <Text style={{fontSize: 13}}>{ Number((this.props.site.location.coordinates[1]).toFixed(5))}, {Number((this.props.site.location.coordinates[0]).toFixed(5))}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <DiveSiteReviews reviews={this.reviews} rating={this.state.rating} changeRating={(rating) => this.changeRating(rating)} userModified={this.state.userModified} />
              </View>
            </View>
            {this.props.selected ? <DiveSiteCardExpanded site={this.props.site} /> : <View></View>}
          </View>

      </View>
    );
  }
}

function DiveSiteReviews({ reviews, rating, changeRating, userModified }) {
  return (
    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <Ratings
          rating={rating}
          widgetRatedColors={userModified ? "black" : "A00000"}
          widgetDimensions="14px"
          widgetSpacings="1px"
          changeRating={(rating) => changeRating(rating)}>
          <Ratings.Widget widgetHoverColor="black"  />
          <Ratings.Widget widgetHoverColor="black"  />
          <Ratings.Widget widgetHoverColor="black"  />
          <Ratings.Widget widgetHoverColor="black"  />
          <Ratings.Widget widgetHoverColor="black"  />
        </Ratings>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 5}}>({reviews()} review)</Text>
        </View>
      </View>
    </View>
  )
}

function DiveSiteCardExpanded({ site }) {
  return (
    <View>
      {!site.details || !site.details.description ? <View></View> :
        <Text style={{fontSize: 18, marginTop: 20}}>{site.details.description}</Text>
      }

      <View style={{marginTop: 20}}>
        {!site.details || !site.details.depth ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.depth}</Text>
          </View>
        }
        {!site.details || !site.details.visibility ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.visibility}</Text>
          </View>
        }
        {!site.details || !site.details.access ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.access}</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default DiveSiteCard;
