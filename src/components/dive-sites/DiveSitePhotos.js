import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ImageUpload from '../header/add-photo/ImageUpload';
import ReactPlaceholder from 'react-placeholder';

class DiveSitePhotos extends Component {
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

    if (!this.props.diveSite.photos || this.props.diveSite.photos.length === 0) {
      return (
        <View style={{height: 400, borderWidth: 1, borderColor: "#DDDDDD"}}>
          <ImageUpload diveSite={this.props.diveSite} reload={(this.props.reload)} />
        </View>
      )
    } 

    const {diveSite, reload} = this.props

    return (
      <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400}}>     
        <View style={{flex: 1}}>
          <Image style={{flex: 1}} source={diveSite.photos[this.state.photoSelectedIndex].url} />
          <View style={{position: 'absolute', bottom: 0, left: 0, alignItems: 'center', backgroundColor: 'black'}}>
            <PhotoNavigation previewBack={this.previewBack} previewForward={this.previewForward} selectedIndex={this.state.photoSelectedIndex} length={diveSite.photos.length} />
            {/* <PhotoCredits photo={diveSite.photos[this.state.photoSelectedIndex]} /> */}
          </View>
          <TouchableOpacity onPress={this.props.openAddPhoto} style={{backgroundColor: 'black', position: 'absolute', right: 0, bottom: 0}}>
            <View style={{flexDirection: 'row', padding: 7.5, marginHorizontal: 5}}>
              <Text style={{color: 'white'}}>Add a Photo</Text>
              <Image style={{width: 15, height: 15, marginLeft: 5, tintColor: 'white'}} source={require('../../assets/edit.svg')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function PhotoCredits({ photo }) {
  return (
    <View>
      <Text style={{color: '#FFFFFF'}}>Uploaded by {photo.author.username}</Text>
      <Text style={{color: '#FFFFFF'}}>{new Date(photo.timestamp).toLocaleDateString("en-US")}</Text>
    </View>
  )
}

function PhotoNavigation({ previewBack, previewForward, selectedIndex, length}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
        <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/left.svg')} />
      </TouchableOpacity>
      <Text style={{color: '#FFFFFF'}}>Image {selectedIndex + 1} of {length}</Text>
      <TouchableOpacity onPress={previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
        <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/right.svg')} />
      </TouchableOpacity>
    </View>
  )
}

export default DiveSitePhotos;