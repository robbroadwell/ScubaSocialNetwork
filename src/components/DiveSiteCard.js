import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import Stars from './Stars';
import Ratings from 'react-ratings-declarative';

function DiveSiteCard({ site, selected, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
            <View style={{margin: 5, marginBottom: 0, padding: 15, backgroundColor: '#FEFEFE', shadowColor: '#000',
                borderColor: "#A00000",
                borderRadius: 3,
                // borderWidth: selected ? 2 : 0,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 5}}>
                {selected ? <DiveSiteCardExpanded site={site} /> : <DiveSiteCardCollapsed site={site} />}
            </View>
        </TouchableOpacity>   
    )
}

class DiveSiteCardCollapsed extends Component {
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
          if (!this.props || !this.props.site || !this.props.site.reviews) {
              return 0
          } 
        
          var total = 0;
          var x;
  
          for (x in this.props.site.reviews) {
              total = total + this.props.site.reviews[x].rating
          }
  
          return total / this.props.site.reviews.length
      }

      render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{this.props.site.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.props.site.country}, </Text>
                            <Text style={{fontSize: 13}}>{ Number((this.props.site.location.coordinates[1]).toFixed(5))}, {Number((this.props.site.location.coordinates[0]).toFixed(5))}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            <Ratings
                                rating={this.state.rating}
                                widgetRatedColors={this.state.userModified ? "black" : "A00000"}
                                widgetDimensions="15px"
                                widgetSpacings="2px"
                                changeRating={this.changeRating}
                            >
                                <Ratings.Widget widgetHoverColor="black"  />
                                <Ratings.Widget widgetHoverColor="black"  />
                                <Ratings.Widget widgetHoverColor="black"  />
                                <Ratings.Widget widgetHoverColor="black"  />
                                <Ratings.Widget widgetHoverColor="black"  />
                            </Ratings>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{marginLeft: 5}}>( {this.props.site.reviews ? this.props.site.reviews.length : 0} reviews )</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
      }
}

function DiveSiteCardExpanded({ site }) {
    return (
        <View>
            <DiveSiteCardCollapsed site={site} />
            
            {!site.description ? <View></View> : 
                <Text style={{fontSize: 18, marginTop: 20}}>{site.description}</Text>
            }

            <View style={{marginTop: 20}}>
                {!site.depth ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.depth}</Text>
                    </View>
                }
                {!site.visibility ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.visibility}</Text>
                    </View>
                }
                {!site.access ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.access}</Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default DiveSiteCard;