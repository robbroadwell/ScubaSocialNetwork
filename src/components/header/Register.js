import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setLoginMode, setRegisterMode } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import StyledLinkWhiteUnderline from '../buttons/StyledLinkWhiteUnderline';
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
import FullScreenConfetti from '../../utility/FullScreenConfetti';
const axios = require('axios')

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      termsAccepted: false,
      isLoading: false,
      isFirstNameMissing: false,
      isLastNameMissing: false,
      isEmailMissing: false,
      isEmailInvalid: false,
      isUsernameMissing: false,
      isPasswordMissing: false,
      isPasswordMismatch: false,
      isPasswordNotMatchingRequirements: false,
      onSomethingWentWrong: false,
      onSomethingWentWrongError: ""
    };
  }

  componentWillMount() {
    document.body.style.overflow = "hidden"
  }

  onChangeTextFirstName = input => {
    this.setState({ firstName: input, isFirstNameMissing: false });
  };

  onChangeTextLastName = input => {
    this.setState({ lastName: input, isLastNameMissing: false });
  };

  onChangeTextUsername = input => {
    this.setState({ username: input, isUsernameMissing: false, onUsernameConflict: false });
  };

  onChangeTextPassword = input => {
    this.setState({ password: input, isPasswordMismatch: false, isPasswordMissing: false, isPasswordNotMatchingRequirements: false });
  };

  onChangeTextConfirmPassword = input => {
    this.setState({ confirmPassword: input, isPasswordMismatch: false });
  };

  onChangeTextEmail = input => {
    this.setState({ email: input, isEmailMissing: false, isEmailInvalid: false });
  };

  onToggleTermsAccepted = () => {
    this.setState(prevState => ({
      termsAccepted: !prevState.termsAccepted
    }))
  }

  onPressSubmit = () => {

    if (this.state.firstName === "") {
      this.setState({ isFirstNameMissing: true })
      return
    }

    if (this.state.lastName === "") {
      this.setState({ isLastNameMissing: true })
      return
    }

    if (this.state.email === "") {
      this.setState({ isEmailMissing: true })
      return
    }

    if (!this.validateEmail(this.state.email)) {
      this.setState({ isEmailInvalid: true })
      return
    }

    if (this.state.username === "") {
      this.setState({ isUsernameMissing: true })
      return
    }

    if (this.state.password === "") {
      this.setState({ isPasswordMissing: true })
      return
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ isPasswordMismatch: true })
      return
    }

    if (!this.validatePassword(this.state.password).result) {
      this.setState({ isPasswordNotMatchingRequirements: true })
      return
    }

    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ isLoading: true });
      axios.post(BaseURL() + '/api/users/register', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
      .then((response) => {        
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
            isLoading: false
           });
           
           document.body.style.overflow = "visible"
          this.props.setUser(response.data.user);
          this.props.setRegisterMode(false);
        }.bind(this));
      }).catch(error => {
        this.setState({ onSomethingWentWrong: true, onSomethingWentWrongError: error.response.data.error, isLoading: false });
      });
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

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword = (p) => {
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/; 
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj = {};
    obj.result = true;

    // if(p.length < 15){
    //     obj.result=false;
    //     obj.error="Not long enough!"
    //     return obj;
    // }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for(var i=0; i<p.length; i++){
        if(anUpperCase.test(p[i]))
            numUpper++;
        else if(aLowerCase.test(p[i]))
            numLower++;
        else if(aNumber.test(p[i]))
            numNums++;
        else if(aSpecial.test(p[i]))
            numSpecials++;
    }

    if(numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1){
        obj.result=false;
        obj.error="Wrong Format!";
        return obj;
    }
    return obj;
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
            <Image style={{height: 80, width: 50, margin: 20, marginBottom: 5, tintColor: '#FFFFFF'}} source={require('../../assets/d_logo.svg')} />
            <Text style={{color: 'white', fontWeight: '600', marginBottom: 10}}>Welcome to the world's premier diving community.</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{ height: 40, outlineWidth: 0, width: 145, marginRight: 10, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
                placeholderTextColor={'#CCCCCC'}
                onChangeText={text => this.onChangeTextFirstName(text)}
                placeholder={'First Name'}
                value={this.state.firstName}
                />
              <TextInput
                style={{ height: 40, outlineWidth: 0, width: 145, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
                placeholderTextColor={'#CCCCCC'}
                onChangeText={text => this.onChangeTextLastName(text)}
                placeholder={'Last Name'}
                value={this.state.lastName}
                />
            </View>
            <TextInput
              style={{ height: 40, outlineWidth: 0, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextEmail(text)}
              placeholder={'Your Email'}
              value={this.state.email}
            />
            <TextInput
              style={{ height: 40, outlineWidth: 0, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5, marginTop: 20 }}          
              placeholderTextColor={'#CCCCCC'}
              onChangeText={text => this.onChangeTextUsername(text)}
              placeholder={'Choose a Username'}
              value={this.state.username}
              />
            <TextInput
              style={{ height: 40, outlineWidth: 0, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              secureTextEntry={true} 
              onChangeText={text => this.onChangeTextPassword(text)}
              placeholder={'Password'}
              value={this.state.password}
            />
            <TextInput
              style={{ height: 40, outlineWidth: 0, width: 300, color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
              placeholderTextColor={'#CCCCCC'}
              secureTextEntry={true} 
              onChangeText={text => this.onChangeTextConfirmPassword(text)}
              placeholder={'Confirm Password'}
              value={this.state.confirmPassword}
            />

            {this.state.isFirstNameMissing ? <Text style={{color: 'red'}}>First name is required.</Text> : <View/>}
            {this.state.isLastNameMissing ? <Text style={{color: 'red'}}>Last name is required.</Text> : <View/>}
            {this.state.isEmailMissing ? <Text style={{color: 'red'}}>Email is required.</Text> : <View/>}
            {this.state.isEmailInvalid ? <Text style={{color: 'red'}}>Email appears to invalid.</Text> : <View/>}
            {this.state.isUsernameMissing ? <Text style={{color: 'red'}}>Username is required.</Text> : <View/>}
            {this.state.isPasswordMissing ? <Text style={{color: 'red'}}>Password is required.</Text> : <View/>}
            {this.state.isPasswordMismatch ? <Text style={{color: 'red'}}>Passwords do not match.</Text> : <View/>}
            {this.state.isPasswordNotMatchingRequirements ? <View><Text style={{color: 'red', textAlign: 'center'}}>Passwords require an uppercase and lowercase</Text><Text style={{color: 'red', textAlign: 'center'}}>letter, a number, and a special character.</Text></View> : <View/>}
            {this.state.onSomethingWentWrong ? <Text style={{color: 'red'}}>{this.state.onSomethingWentWrongError}</Text> : <View/>}

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this.onToggleTermsAccepted} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <View style={{width: 18, height: 18, marginHorizontal: 5, borderColor: 'white', borderWidth: 1}} />
                {!this.state.termsAccepted ? <View></View> : <Image style={{height: 20, width: 14, position: 'absolute', top: -1, left: 7, tintColor: 'white'}} source={require('../../assets/checkmark.svg')} />}
              </TouchableOpacity>
              <Text style={{color: 'white'}}>I agree to the <StyledLinkWhiteUnderline to="/conditions">Terms and Conditions</StyledLinkWhiteUnderline>.</Text>
            </View>

            <TouchableOpacity disabled={!this.state.termsAccepted} style={{opacity: this.state.termsAccepted ? 1 : 0.5}} onPress={() => this.onPressSubmit()}>
              <Text style={{textAlign: 'center', borderColor: '#CCCCCC', borderWidth: 1, padding: 10, margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onPressLogin}>
              <Text style={{textAlign: 'center', margin: 5, color: 'white', fontSize: 14}}>Already have an account? Login.</Text>
            </TouchableOpacity>

            {this.state.isLoading ? <Loading /> : <View></View>}
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
