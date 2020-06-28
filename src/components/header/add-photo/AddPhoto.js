import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ImageUpload from './ImageUpload';
import Loading from '../../misc/Loading';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../../utility/BaseURL';
const axios = require('axios')

class AddPhoto extends Component {

  componentWillMount() {
    document.body.style.overflow = "hidden"

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/add-photo');
    }
  }

  render() {
    
    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />

        <View style={{alignItems: 'center', marginBottom: 10}}>
          <View style={{backgroundColor: 'black', padding: 50, alignItems: 'center'}}>
            <TouchableOpacity onPress={this.props.close} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../../assets/close.png')} />
            </TouchableOpacity>

            <ImageUpload diveSite={this.props.diveSite} reload={(this.reload)} />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {  };
};

  export default connect(
    mapStateToProps,
    {  }
  )(AddPhoto);
