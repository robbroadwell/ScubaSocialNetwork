import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ImageUpload from '../../explore/result/ImageUpload';
import ReactPlaceholder from 'react-placeholder';

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
    if (!this.props.diveSite) {
      return <ReactPlaceholder type='rect' style={{height: 400}} showLoadingAnimation={true} />
    }

    if (this.props.diveSite.photos || this.props.diveSite.photos.length === 0) {
      return (
        <View style={{height: 400, borderWidth: 1, borderColor: "#DDDDDD"}}>
          <ImageUpload />
        </View>
      )
    }

    const {diveSite} = this.props

    return (
      <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400}}>     
        {!diveSite || !diveSite.photos || diveSite.photos.length === 0 ? <View></View> : 
          <View style={{flex: 1}}>
            <Image style={{flex: 1}} source={diveSite.photos[this.state.photoSelectedIndex].url} />
            <View style={{position: 'absolute', bottom: 0, left: 0, alignItems: 'center', margin: 10}}>
              
              { diveSite.photos.length === 1 ? <View></View> : 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                    <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../../assets/left.svg')} />
                  </TouchableOpacity>
                  <Text style={{color: '#FFFFFF'}}>Image {this.state.photoSelectedIndex + 1} of {diveSite.photos.length}</Text>
                  <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                    <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../../assets/right.svg')} />
                  </TouchableOpacity>
                </View>
              }
              
              <Text style={{color: '#FFFFFF'}}>Uploaded by {diveSite.photos[this.state.photoSelectedIndex].author.username}</Text>
              <Text style={{color: '#FFFFFF'}}>{new Date(diveSite.photos[this.state.photoSelectedIndex].timestamp).toLocaleDateString("en-US")}</Text>
            </View>
          </View>
          
        }
      </View>
    )
  }
}

export default ResultPhotos;