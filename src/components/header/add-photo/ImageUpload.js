import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DragAndDrop from './DragAndDrop'
import Loading from '../../misc/Loading';
import BaseURL from '../../../utility/BaseURL';
import StyledLink from '../../buttons/StyledLink';

import { connect } from "react-redux";
import { getUser } from '../../../redux/selectors';
import { setRegisterMode } from '../../../redux/actions';

const axios = require('axios')

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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

  cancelUpload = () => {
    this.setState({ files: [], previews: [] })
  }

  upload = () => {

    if (!this.props.user || !this.props.user.token) {
      this.props.setRegisterMode(true);
      return
    }

    console.log(this.state.files[0])
    console.log(this.state.previews[0])
    const file = this.state.files[0];
    const id = this.props.diveSite._id;

    this.setState({ loading: true });

    axios({
      method: 'put',
      url: BaseURL() + '/api/dive-sites/photo-upload/',
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
          url: BaseURL() + '/api/dive-sites/photos/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.user.token
          },
          data: {
              id: id,
              url: url
          }
    
        }).then(function (response) {
          this.props.reload()
          this.setState({ loading: false, files: [] });

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
      return ( // ready for drop
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
          <DragAndDrop handleDrop={this.handleDrop}>
            <View style={{position: 'absolute', backgroundColor: 'black', height: '100%', width: '100%', alignItems: 'center', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 20, justifyContent: 'center'}}>
              <Image style={{width: 50, height: 50, tintColor: 'white'}} source={require('../../../assets/add_photo.svg')} />
              <Text style={{textAlign: 'center', marginTop: 10, color: 'white', fontSize: 16}}>Drag Photo Here</Text>
            </View>
          </DragAndDrop>
        </View>
      )
    }

    console.log(this.props.user)

    if (!this.props.user || !this.props.user.token) {
      this.props.setRegisterMode(true);
    }
    
    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 20}}>
        
        <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={this.state.previews[this.state.selectedIndex]} />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          
          <View>
            <View style={{backgroundColor: 'black', opacity: 0.8, position: 'absolute', width: '100%', height: '100%'}} />
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity onPress={this.toggleCheckmark} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <View style={{width: 18, height: 18, marginHorizontal: 10, borderColor: 'white', borderWidth: 1}} />
                {!this.state.checkmark ? <View></View> : <Image style={{height: 20, width: 14, position: 'absolute', top: -1, left: 12, tintColor: 'white'}} source={require('../../../assets/checkmark.svg')} />}
              </TouchableOpacity>
                <Text style={{color: 'white'}}>I certify that I own the rights to this photograph, and agree to DivingCollective's <StyledLink to="/conditions">Terms and Conditions</StyledLink></Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.cancelUpload} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Text style={{textAlign: 'center', marginVertical: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!this.state.checkmark} onPress={() => this.upload()} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Text style={{textAlign: 'center', marginVertical: 20, color: 'white', opacity: this.state.checkmark ? 1.0 : 0.5, fontWeight: 'bold', fontSize: 18}}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
        {!this.state.loading ? <View /> : <Loading />}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { setRegisterMode }
)(ImageUpload);