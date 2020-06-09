import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import ResultDetails from './ResultDetails'

class ResultPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photoSelectedIndex: 0
    };
  }

  previewBack = () => {
    const {diveSite} = this.props
    this.setState({
      photoSelectedIndex: this.state.photoSelectedIndex > 0 ? this.state.photoSelectedIndex = (this.state.photoSelectedIndex - 1) : 0
    });
  }

  previewForward = () => {
    const {diveSite} = this.props
    this.setState({
      photoSelectedIndex: (this.state.photoSelectedIndex >= (diveSite.photos.length - 1)) ? this.state.photoSelectedIndex : (this.state.photoSelectedIndex + 1)
    });
  }

  render() {
    const {diveSite} = this.props
    const photo = diveSite.photos[this.state.photoSelectedIndex]

    return (
      <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400, marginVertical: 20}}>
                  
        {!diveSite.photos || diveSite.photos.length === 0 ? <View></View> : 
          <View style={{flex: 1}}>
            <Image style={{flex: 1}} source={photo.url} />
            <View style={{position: 'absolute', bottom: 0, left: 0, alignItems: 'center', margin: 10}}>
              
              { diveSite.photos.length === 1 ? <View></View> : 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                    <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/left.svg')} />
                  </TouchableOpacity>
                  <Text style={{color: '#FFFFFF'}}>Image {this.state.photoSelectedIndex + 1} of {diveSite.photos.length}</Text>
                  <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                    <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/right.svg')} />
                  </TouchableOpacity>
                </View>
              }
              
              <Text style={{color: '#FFFFFF'}}>Uploaded by {photo.author.username}</Text>
              <Text style={{color: '#FFFFFF'}}>{new Date(photo.timestamp).toLocaleDateString("en-US")}</Text>
            </View>
          </View>
          
        }
        <ResultDetails diveSite={diveSite} />
      </View>
    )
  }
}

export default ResultPhotos;