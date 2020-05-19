import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import ScubaMap from "./ScubaMap";

class Root extends Component {
    render() {
        return (
            <View style={{height: '100vh'}}>
                <View style={{backgroundColor: "#1d1d1e"}}>
                    <Image style={{width: 200, height: 40, margin: 10, tintColor: 'white'}} source={require('../assets/logo.png')} />
                </View>
                <View style={{flex: 1}}>
                    <ScubaMap />
                </View>
            </View>
        );
    }
}

export default Root;