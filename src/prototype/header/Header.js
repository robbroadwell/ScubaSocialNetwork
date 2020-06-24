import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser, getLoginMode } from "../../redux/selectors";
import { setLoginMode } from '../../redux/actions';
import PopoverButton from '../../utility/buttons/PopoverButton';
import { withRouter } from 'react-router-dom'
import Login from '../../components/header/Login';
const axios = require('axios')

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contactVisible: false,
        email: "",
        feedback: ""
    };
  }

  toggleLogin = () => {
    this.props.setLoginMode(!this.props.loginMode)
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
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 55, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{width: 30, height: 20, marginHorizontal: 15}} source={require('../../assets/flag2.svg')} />
            <Image style={{width: 160, height: 25, marginTop: 2}} source={require('../../assets/logo_27.svg')} />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
         <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 20}}>Dive Sites</Text>
         <View style={{backgroundColor: '#A00000', height: 5, width: '100%', bottom: -1, position: 'absolute'}}></View>
        </TouchableOpacity> */}

        <View style={{flex: 1}} ></View>

        {/* <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Destinations</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Shop</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Liveaboards</Text> */}

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          <View>
            <PopoverButton action={this.toggleLogin} popover={this.props.loginMode} title={this.props.user.username ? this.props.user.username : 'Login'} icon={this.state.loginVisible ? require('../../assets/drop_up.svg') : require('../../assets/drop_down.svg')} >
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
  const loginMode = getLoginMode(state);
  return { user, loginMode };
};

export default connect(
  mapStateToProps,
  { setLoginMode }
)(withRouter(Header));
