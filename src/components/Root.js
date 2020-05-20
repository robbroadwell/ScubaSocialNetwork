import React, {Component} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import GoogleMap from './GoogleMap';

class Root extends Component {
    render() {
        return (
            <View style={{height: '100vh', flexDirection: 'column'}}>
                <View style={{backgroundColor: "#1d1d1e", flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 200, height: 38, margin: 10, tintColor: 'white'}} source={require('../assets/logo.svg')} />
                    <Image style={{width: 40, height: 28, margin: 5}} source={require('../assets/flag.png')} />
                    <View style={{flex: 1}}>
                        <TouchableOpacity>
                            <Text style={{textAlign: 'right', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Add Dive Site</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <GoogleMap />
                    </View>
                    <View style={{width: '25%', backgroundColor: "#FEFEFE"}}>
                        <ScrollView>
                            <View>
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
            </View>
        );
    }
}

function Card() {
    return (
        <View style={{height: 200, margin: 10, marginBottom: 0, backgroundColor: '#DDDDDD', borderRadius: 7}} />
    )
}

export default Root;