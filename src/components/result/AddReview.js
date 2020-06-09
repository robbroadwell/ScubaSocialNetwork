import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ratings from 'react-ratings-declarative';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      title: "",
      review: ""
    };
  }

  onChangeRating = input => {
    this.setState({ rating: input });
  };

  onChangeTextTitle = input => {
    this.setState({ title: input });
  };

  onChangeTextReview = input => {
    this.setState({ review: input });
  };

  addReview = () => {
    console.log("add")
    var review = {
      rating: this.state.rating,
      title: this.state.title,
      comment: this.state.review,
      timestamp: Date.now()
    }
    this.props.addReview(review);
  }

  render() {
    return (
      <View>
        <View style={{margin: 20, alignItems: 'center'}}>
          <Ratings
            rating={this.state.rating}
            widgetRatedColors={"#FFB400"}
            widgetDimensions="22px"
            widgetSpacings="1px"
            changeRating={(rating) => this.onChangeRating(rating)}>
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
          </Ratings>
          <TextInput
            style={{ height: 40, width: '90%', color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
            placeholderTextColor={'#CCCCCC'}
            onChangeText={text => this.onChangeTextTitle(text)}
            placeholder={'Title for your review'}
            value={this.state.title}
            />
          <TextInput
            style={{ height: 40, height: 120,  color: 'white', backgroundColor: 'gray', textAlignVertical: 'top', width: '90%', borderColor: 'gray', padding: 10, borderWidth: 1 }}
            multiline={true}
            placeholderTextColor={'#CCCCCC'}
            onChangeText={text => this.onChangeTextReview(text)}
            placeholder={'How was it? What did you see?'}
            value={this.state.review}
          />
          <TouchableOpacity onPress={() => this.addReview()}>
            <Text style={{textAlign: 'center', marginTop: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default AddReview;