import React, {Component} from 'react';
import { View, Text } from 'react-native';
import ScubaMap from "./ScubaMap";

class Root extends Component {
    render() {
        return (
            <View style={{height: '100vh'}}>
                <View>
                    <Text style={{padding: 20}}>OceanSpots</Text>
                </View>
                <View style={{flex: 1}}>
                    <ScubaMap />
                </View>
            </View>
        );
    }
}

export default Root;