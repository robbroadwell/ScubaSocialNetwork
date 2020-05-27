import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

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
    
    render() {
        return (
            <View style={{opacity: 1, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{position: 'absolute', width: '100%', height: '100%', left: 0, right: 0, backgroundColor: 'black', opacity: 0.8}} />
                <View style={{position: 'absolute', backgroundColor: 'white', padding: 100, paddingBottom: 60}}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                        onChangeText={text => this.onChangeTextUsername(text)}
                        value={this.state.username}
                        />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', padding: 10, borderWidth: 1 }}
                        onChangeText={text => this.onChangeTextPassword(text)}
                        value={this.state.password}
                    />
                    <TouchableOpacity>
                        <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(
    null,
    { setUser }
  )(Login);