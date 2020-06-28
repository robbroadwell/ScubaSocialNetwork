import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Ratings from 'react-ratings-declarative';
import ReactGA from 'react-ga';
import FullScreenConfetti from '../../../utility/FullScreenConfetti';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      title: "",
      review: ""
    };
  }

  componentWillMount() {
    document.body.style.overflow = "hidden"

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/add-review');
    }
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
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <FullScreenConfetti />
        <View style={{zIndex: 1000, alignItems: 'center'}}>

          <View style={{backgroundColor: 'black', padding: 30, alignItems: 'center', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 20}}>
            <TouchableOpacity onPress={this.props.close} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../../assets/close.png')} />
            </TouchableOpacity>
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
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Title for your review'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 200, width: 400,  color: 'white', backgroundColor: 'gray', textAlignVertical: 'top',borderColor: 'gray', padding: 10, borderWidth: 1 }}
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
      </View>
    )
  }
}

export default AddReview;