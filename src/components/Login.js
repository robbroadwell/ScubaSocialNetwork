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
        if (!this.props.visible) {
            return <View></View>
        }
        return (
            <View style={{opacity: 1, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{position: 'absolute', width: '100%', height: '100%', left: 0, right: 0, backgroundColor: 'black', opacity: 0.8}} />
                <View style={{position: 'absolute', backgroundColor: 'white', padding: 100, paddingBottom: 60}}>
                    <TouchableOpacity style={{position: 'absolute', top: 5, right: 5}} onPress={this.props.disableLoginMode}>
                        <Image style={{height: 25, width: 25, margin: 5, tintColor: 'black'}} source={require('../assets/close.png')} />
                    </TouchableOpacity>

                    {this.props.user.username ? 
                    
                    <View>
                        <Text style={{textAlign: 'center', fontSize: 18}}>{this.props.user.username}</Text>
                        <Text style={{textAlign: 'center', fontSize: 18}}>{this.props.user.email}</Text>
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