import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DragAndDrop from '../../utility/DragAndDrop'
import qs from 'qs';

import { connect } from "react-redux";
import { getUser } from '../../redux/selectors';

const axios = require('axios')

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkmark: false,
      selectedIndex: 0,
      files: [

      ],
      previews: [

      ]
    };
  }

 handleDrop = (files) => {
    let previews = this.state.previews
    for (var i = 0; i < files.length; i++) {
      var url = URL.createObjectURL(files[i])
      previews.push(url)
    }
    this.setState({
      files: files,
      previews: previews
    })
  }

  previewBack = () => {
    this.setState({
      selectedIndex: this.state.selectedIndex > 0 ? this.state.selectedIndex = (this.state.selectedIndex - 1) : 0
    });
  }

  previewForward = () => {
    this.setState({
      selectedIndex: (this.state.selectedIndex >= (this.state.files.length - 1)) ? this.state.selectedIndex : (this.state.selectedIndex + 1)
    });
  }

  toggleCheckmark = () => {
    this.setState(prevState => ({
      checkmark: !prevState.checkmark
    }));
  }

  upload = () => {
    console.log(this.state.files[0])
    console.log(this.state.previews[0])
    const file = this.state.files[0];
    const id = this.props.diveSiteID;

    axios({
      method: 'put',
      url: 'https://www.divingscore.com/api/dive-sites/photo-upload/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
        id: id,
        fileName: file.name,
        fileType: file.type
      }

    }).then(response => {
      
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };

      axios.put(response.data.data.signedRequest,file,options)
      .then(result => {
        const base = "https://divingcollective-photos.s3.us-east-2.amazonaws.com/"
        const url = base + id + "/" + file.name
        console.log(url)
        console.log("Response from s3")
        console.log(this.props.user)

        axios({
          method: 'put',
          url: 'http://localhost:8080/api/dive-sites/photos/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.user.token
          },
          data: {
              id: id,
              url: url
          }
    
        }).then(function (response) {
          this.props.fetchDiveSite()
          this.props.toggleAddPhoto()
          console.log(response)

        }.bind(this));

      })
      .catch(error => {
        console.log(error)
      })
    }
    )
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  render() {
    if (this.state.files.length === 0) {
      return (
        <DragAndDrop style={{flex: 1}} handleDrop={this.handleDrop}>
          <View style={{width: 300, height: 250}}>
            <View style={{flex: 1, margin: 20, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 50, height: 50, tintColor: '#FFFFFF'}} source={require('../../assets/add_photo.svg')} />
              <Text style={{textAlign: 'center', marginTop: 10, color: 'white', fontSize: 16}}>Drag Photo Here</Text>
            </View>
          </View>
        </DragAndDrop>
      )
    }
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <View>
          <Image style={{height: 250, width: 300}} source={this.state.previews[this.state.selectedIndex]} />
          {/* {
            this.state.files.length === 1 ? <View></View> : 
            <View style={{position:'absolute', top: 220, flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Image style={{width: 18, height: 18, tintColor: '#FFFFFF'}} source={require('../assets/left.svg')} />
              </TouchableOpacity>
              <Text style={{color: '#FFFFFF'}}>Image {this.state.selectedIndex + 1} of {this.state.files.length}</Text>
              <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Image style={{width: 18, height: 18, tintColor: '#FFFFFF'}} source={require('../assets/right.svg')} />
              </TouchableOpacity>
            </View>
          } */}
          
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity onPress={this.toggleCheckmark} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <View style={{width: 18, height: 18, marginHorizontal: 10, borderColor: '#FFFFFF', borderWidth: 1}} />
                {!this.state.checkmark ? <View></View> : <Image style={{height: 20, width: 14, position: 'absolute', top: -1, left: 12, tintColor: 'white'}} source={require('../../assets/checkmark.svg')} />}
              </TouchableOpacity>
              <Text style={{color: 'white'}}>I certify that I own the rights to this photograph, and <span style={{textDecorationLine: 'underline'}}>agree to the T&C.</span></Text>
            </View>
            <TouchableOpacity disabled={!this.state.checkmark} onPress={() => this.upload()} activeOpacity={1.0} style={{marginHorizontal: 5}} >
              <Text style={{textAlign: 'center', marginVertical: 20, color: 'white', opacity: this.state.checkmark ? 1.0 : 0.5, fontWeight: 'bold', fontSize: 18}}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DragAndDrop>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  {  }
)(ImageUpload);