import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setLoginMode } from "../../redux/actions";
import { getUser, getLoginMode } from "../../redux/selectors";
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
        this.props.setLoginMode(false);
        this.setState({ loading: false });
      }.bind(this)
      );
    }
  }

  onPressRegister = () => {
    this.props.setLoginMode(false);
    this.props.history.push(`/register`)
  }

  onPressLogout = () => {
    this.props.setUser([]);
    this.props.setLoginMode(false);
  }

  render() {
    if (!this.props.loginMode) {
      return <View></View>
    }

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview('/login');
    }
    
    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', top: 0, backgroundColor: 'black'}}>
        <Image style={{height: 80, width: 50, margin: 20, marginBottom: 10, tintColor: '#FFFFFF'}} source={require('../../assets/d_logo.svg')} />

        {this.props.user.username ?

        <View style={{maxWidth: 700, marginBottom: 10}}>
          <Text style={{textAlign: 'center', fontSize: 24, color: 'white', marginBottom: 2}}>{this.props.user.username}</Text>
          <Text style={{textAlign: 'center', fontSize: 18, color: 'white', marginBottom: 10}}>{this.props.user.email}</Text>
          <TouchableOpacity onPress={() => this.onPressLogout()}>
            <Text style={{textAlign: 'center', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
          </TouchableOpacity>
        </View>

        :

        <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
          <TextInput
            style={{ height: 40, width: '90%', color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
            placeholderTextColor={'#CCCCCC'}
            onChangeText={text => this.onChangeTextUsername(text)}
            placeholder={'Username'}
            value={this.state.username}
            />
          <TextInput
            style={{ height: 40, width: '90%', color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 5 }}          
            placeholderTextColor={'#CCCCCC'}
            onChangeText={text => this.onChangeTextPassword(text)}
            placeholder={'Password'}
            value={this.state.password}
          />
          <TouchableOpacity onPress={() => this.onPressSubmit()}>
            <Text style={{textAlign: 'center', margin: 20, marginBottom: 15, color: 'white', fontWeight: 'bold', fontSize: 18}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressRegister}>
            <Text style={{textAlign: 'center', margin: 5, color: 'white', fontSize: 12}}>New? Create a free account.</Text>
          </TouchableOpacity>

        </View>

        }
        
        {this.state.loading ? <Loading /> : <View></View>}
        
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
    { setUser, setLoginMode }
  )(withRouter(Login));
