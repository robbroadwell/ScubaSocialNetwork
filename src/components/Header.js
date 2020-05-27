import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite } from '../redux/actions';

class Header extends Component {
    render() {
        return (
            <View style={{backgroundColor: "#1d1d1e", flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 40, height: 28, margin: 15, marginLeft: 15}} source={require('../assets/flag.png')} />
                <Image style={{width: 200, height: 38, margin: 5}} source={require('../assets/logo_alt.svg')} />
                
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={this.props.enableLoginMode}>
                        <Text style={{textAlign: 'right', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Header;