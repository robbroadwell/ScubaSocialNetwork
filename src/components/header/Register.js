import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setLoginMode, setRegisterMode } from "../../redux/actions";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
import FullScreenConfetti from '../../utility/FullScreenConfetti';
const axios = require('axios')

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      termsAccepted: false,
      loading: false
    };
  }

  componentWillMount() {
    document.body.style.overflow = "hidden"
  }

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  onChangeTextUsername = input => {
    this.setState({ username: input });
  };

  onChangeTextPassword = input => {
    this.setState({ password: input });
  };

  onChangeTextConfirmPassword = input => {
    this.setState({ confirmPassword: input });
  };

  onChangeTextEmail = input => {
    this.setState({ email: input });
  };

  onToggleTermsAccepted = () => {
    this.setState(prevState => ({
      termsAccepted: !prevState.termsAccepted
    }))
  }

  onPressSubmit = () => {
    // handle error cases

    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      axios.post(BaseURL() + '/api/users/register', {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
      .then(function (response) {

        if (response.status !== 200) {
          console.log('something went wrong')
          this.setState({ loading: false });
        }

        axios.post(BaseURL() + '/api/users/login', {
          username: this.state.username,
          password: this.state.password
        })
        .then(function (response) {
          this.setState({ 
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            termsAccepted: false,
            loading: false
           });
           
          this.props.setUser(response.data.user);
          this.props.setRegisterMode(false);
        }.bind(this));
      }.bind(this));
    }
  }

  onPressLogin = () => {
    this.props.setRegisterMode(false);
    this.props.setLoginMode(true);
  }

  onPressClose = () => {
    document.body.style.overflow = "visible"
    this.props.setRegisterMode(false)
  }

  render() {

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/register');
    }
    
    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <FullScreenConfetti />
        <View style={{zIndex: 1000, alignItems: 'center', marginBottom: 10}}>
          <View style={{backgroundColor: 'black', padding: 30, paddingTop: 0, alignItems: 'center', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 20}}>
            <TouchableOpacity onPress={this.onPressClose} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../assets/close.png')} />
            </TouchableOpacity>
            <Image style={{height: 80, width: 50, margin: 20, marginBottom: 10, tintColor: '#FFFFFF'}} source={require('../../assets/d_logo.svg')} />
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextName(text)}
              placeholder={'Your Name'}
              value={this.state.name}
              />
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextEmail(text)}
              placeholder={'Your Email'}
              value={this.state.email}
            />
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5, marginTop: 20 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextUsername(text)}
              placeholder={'Choose a Username'}
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
            <TextInput
              style={{ height: 40, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              secureTextEntry={true} 
              onChangeText={text => this.onChangeTextConfirmPassword(text)}
              placeholder={'Confirm Password'}
              value={this.state.confirmPassword}
            />

            <TouchableOpacity  onPress={() => this.onPressSubmit()}>
              <Text style={{textAlign: 'center', borderColor: '#CCCCCC', borderWidth: 1, padding: 10, margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onPressLogin}>
              <Text style={{textAlign: 'center', margin: 5, color: 'white', fontSize: 14}}>Already have an account? Login.</Text>
            </TouchableOpacity>

            {this.state.loading ? <Loading /> : <View></View>}
          </View>
        </View> 
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { };
};

  export default connect(
    mapStateToProps,
    { setUser, setLoginMode, setRegisterMode }
  )(withRouter(Register));
