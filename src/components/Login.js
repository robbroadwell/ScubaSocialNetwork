import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import { getUser } from "../redux/selectors";
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

  onPressLogout = () => {
    this.props.setUser([]);
    this.props.disableLoginMode();
  }

  render() {
    return (
      <View>

        {this.props.user.username ?

        <View style={{maxWidth: 700}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>{this.props.user.username}</Text>
          <Text style={{textAlign: 'center', fontSize: 18}}>{this.props.user.email}</Text>
          <Text style={{textAlign: 'center', fontSize: 18, padding: 20}}>{this.props.user.token}</Text>
          <TouchableOpacity onPress={() => this.onPressLogout()}>
            <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
          </TouchableOpacity>
        </View>

        :

        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
            onChangeText={text => this.onChangeTextUsername(text)}
            placeholder={'Username'}
            value={this.state.username}
            />
          <TextInput
            style={{ height: 40, borderColor: 'gray', padding: 10, borderWidth: 1 }}
            onChangeText={text => this.onChangeTextPassword(text)}
            placeholder={'Password'}
            value={this.state.password}
          />
          <TouchableOpacity onPress={() => this.onPressSubmit()}>
            <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Login</Text>
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
  )(Login);
