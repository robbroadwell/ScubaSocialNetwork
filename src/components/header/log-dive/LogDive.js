import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ReactGA from 'react-ga';
import FullScreenConfetti from '../../../utility/FullScreenConfetti';

class LogDive extends Component {
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
      ReactGA.pageview('/log-dive');
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
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Visibility'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Depth'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Water Temperature'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Currents'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Access'}
              value={this.state.title}
              />
            <TextInput
              style={{ height: 40, width: 400, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextTitle(text)}
              placeholder={'Bottom Time'}
              value={this.state.title}
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

export default LogDive;