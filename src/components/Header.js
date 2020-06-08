import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import PopoverButton from './buttons/PopoverButton';
import { withRouter } from 'react-router-dom'
import Login from './Login';
const axios = require('axios')

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginVisible: false,
        contactVisible: false,
        email: "",
        feedback: ""
    };
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      loginVisible: !prevState.loginVisible
    }));
  };

  toggleContact = () => {
    this.setState(prevState => ({
      contactVisible: !prevState.contactVisible
    }));
  }

  onChangeTextEmail = input => {
    this.setState({ email: input });
  };

  onChangeTextFeedback = input => {
    this.setState({ feedback: input });
  };

  addFeedback = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/feedback',
      data: {
          email: this.state.email,
          feedback: this.state.feedback,
      }

    }).then(function (response) {
      this.toggleContact()
    }.bind(this));
  }

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{width: 375, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Image style={{width: 40, height: 25, marginHorizontal: 15}} source={require('../assets/flag2.svg')} />
            <Image style={{width: 220, height: 35, marginTop: 1}} source={require('../assets/logo_27.svg')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
         <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 20}}>Dive Sites</Text>
         <View style={{backgroundColor: '#A00000', height: 5, width: '100%', bottom: -1, position: 'absolute'}}></View>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>We are brand new! Launched on June 15, 2020.</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Please check back often for updates, and we welcome </Text>
            
            <TouchableOpacity onPress={this.toggleContact} style={{height: '100%', justifyContent: 'center'}}>
              <Text style={{textDecorationLine: 'underline'}}>comments and suggestions.</Text>
            </TouchableOpacity>

            {
              !this.state.contactVisible ? <View></View> : 
              <View style={{ backgroundColor: 'white', width: 500, position: 'absolute', top: 100, backgroundColor: '#EFEFEF' }}>
                <View style={{flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 10}}>
                  <Text style={{fontSize: 16, paddingHorizontal: 30, textAlign: 'center', fontWeight: '400'}}>Please let us know what you think! Any and all suggestions are welcome. Thank you for taking the time to send us your ideas!</Text>
                  <TouchableOpacity onPress={this.toggleContact}>
                    <Image style={{width: 20, height: 20, marginRight: 10, alignSelf: 'flex-end'}} source={require('../assets/close.png')} />
                  </TouchableOpacity>
                </View>
                <TextInput
                  multiline={true}
                  placeholder={'Your email (optional)'}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 20, padding: 10, marginBottom: 10 }}
                  onChangeText={text => this.onChangeTextEmail(text)}
                  value={this.state.difficulty}
                  />
                <TextInput
                  multiline={true}
                  placeholder={'Your feedback'}
                  style={{ height: 200, borderColor: 'gray', borderWidth: 1, margin: 20, padding: 10, marginBottom: 10 }}
                  onChangeText={text => this.onChangeTextFeedback(text)}
                  value={this.state.difficulty}
                  />
                  <TouchableOpacity onPress={() => this.addFeedback()}>
                    <Text style={{textAlign: 'center', marginTop: 20, marginBottom: 30, color: 'black', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
                  </TouchableOpacity>
              </View>
            }

          </View>
        </View>

        {/* <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Destinations</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Shop</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Liveaboards</Text> */}

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20}}>
          <View>
            <PopoverButton action={this.toggleLogin} popover={this.state.loginVisible} title={this.props.user.username ? this.props.user.username : 'Login'} icon={this.state.loginVisible ? require('../assets/drop_up.svg') : require('../assets/drop_down.svg')} >
              <View style={{width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                <Login disableLoginMode={this.toggleLogin} />
              </View>
            </PopoverButton>
          </View>
        </View>
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
  {  }
)(withRouter(Header));
