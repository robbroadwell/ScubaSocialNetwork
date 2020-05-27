import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';

class Root extends Component {
    render() {
        return (
            <View style={{height: '100vh', flexDirection: 'column'}}>
                <Header />
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Map />
                    </View>
                    
                    <View style={{width: '33%', minWidth: 450, backgroundColor: "#CCCCCC"}}>
                        <List />
                    </View>
                </View>
                {/* <Login /> */}
            </View>
        );
    }
}

export default Root;