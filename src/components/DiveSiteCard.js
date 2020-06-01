import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableOpacityBase } from 'react-native';
import Ratings from 'react-ratings-declarative';
import HoverableView from './HoverableView';

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
            <HoverableView
              style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', margin: 5, marginBottom: 0, paddingHorizontal: this.props.selected ? 11 : 12, paddingVertical: this.props.selected ? 9 : 10, backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
              onHover={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', margin: 5, marginBottom: 0, paddingHorizontal: this.props.selected ? 11 : 12, paddingVertical: this.props.selected ? 9 : 10, backgroundColor: '#FEFEFE', borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
            >

            <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 16}}>{this.props.site.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                    <Text style={{fontSize: 14}}>{this.props.site.country}, </Text>
                    <Text style={{fontSize: 13}}>{ Number((this.props.site.location.coordinates[1]).toFixed(5))}, {Number((this.props.site.location.coordinates[0]).toFixed(5))}</Text>
                  </View>
                </View>

              <DiveSiteReviews reviews={this.reviews} rating={this.state.rating} changeRating={(rating) => this.changeRating(rating)} userModified={this.state.userModified} />
            </View>
          </HoverableView>
        </TouchableOpacity>
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
            <Text style={{marginLeft: 5}}>({reviews()} review{reviews() == 1 ? '' : 's'})</Text>
        </View>
      </View>
    </View>
  )
}

function DiveSiteCardExpanded({ site, editMode }) {
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
        {!site.details || !site.details.access ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.access}</Text>
          </View>
        }
        {!site.details || !site.details.visibility ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.visibility}</Text>
          </View>
        }
        {!site.details || !site.details.currents ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Currents</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.currents}</Text>
          </View>
        }
        {!site.details || !site.details.airTemperature ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Air Temperature</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.airTemperature}</Text>
          </View>
        }
        {!site.details || !site.details.waterTemperature ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Water Temperature</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.waterTemperature}</Text>
          </View>
        }
        {!site.details || !site.details.experienceLevel ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Experience Level</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{site.details.experienceLevel}</Text>
          </View>
        }

        <TouchableOpacity onPress={editMode} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Image style={{height: 20, width: 20, margin: 10, marginRight: 5, marginTop: 20, tintColor: '#A00000'}} source={require('../assets/create.svg')} />
          <Text style={{color: '#A00000', fontWeight: 'bold', marginTop: 8, marginRight: 5}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DiveSiteCard;
