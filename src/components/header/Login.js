import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { connect } from "react-redux";
import { setUser } from "../../redux/actions";
import { getUser } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'
const axios = require('axios')

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
      axios.post('https://www.divingscore.com/api/users/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        this.setState({ username: "", password: "" });
        this.props.setUser(response.data.user);
        this.props.disableLoginMode();
      }.bind(this));
    }
  }

  onPressRegister = () => {
    this.props.disableLoginMode();
    this.props.history.push(`/register`)
  }

  onPressLogout = () => {
    this.props.setUser([]);
    this.props.disableLoginMode();
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
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
    { setUser }
  )(withRouter(Login));
