import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setLoginMode, setRegisterMode } from "../../redux/actions";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
const axios = require('axios')


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  componentWillMount() {
    document.body.style.overflow = "hidden"
  }

  onChangeTextUsername = input => {
    this.setState({ username: input });
  };

  onChangeTextPassword = input => {
    this.setState({ password: input });
  };

  onPressSubmit = () => {
    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      axios.post(BaseURL() + '/api/users/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        this.setState({ username: "", password: "" });
        this.props.setUser(response.data.user);
        console.log(response.data.user)
        this.props.setLoginMode(false);
        document.body.style.overflow = "visible"
        this.setState({ loading: false });
      }.bind(this)
      );
    }
  }

  onPressRegister = () => {
    this.props.setLoginMode(false);
    this.props.setRegisterMode(true);
  }

  onPressClose = () => {
    document.body.style.overflow = "visible"
    this.props.setLoginMode(false)
  }

  render() {

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/login');
    }

    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <View style={{backgroundColor: 'black', padding: 30, paddingTop: 0, alignItems: 'center'}}>
            <TouchableOpacity onPress={this.onPressClose} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../assets/close.png')} />
            </TouchableOpacity>
            <Image style={{height: 80, width: 50, margin: 20, marginBottom: 10, tintColor: '#FFFFFF'}} source={require('../../assets/d_logo.svg')} />
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextUsername(text)}
              placeholder={'Username'}
              value={this.state.username}
              />
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              secureTextEntry={true} 
              onChangeText={text => this.onChangeTextPassword(text)}
              placeholder={'Password'}
              value={this.state.password}
            />
            <TouchableOpacity onPress={() => this.onPressSubmit()}>
              <Text style={{textAlign: 'center', borderColor: '#CCCCCC', borderWidth: 1, padding: 10, margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onPressRegister}>
              <Text style={{textAlign: 'center', margin: 5, color: 'white', fontSize: 14}}>New? Create a free account.</Text>
            </TouchableOpacity>
            {this.state.loading ? <Loading /> : <View></View>}
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
    { setUser, setLoginMode, setRegisterMode }
  )(withRouter(Login));
