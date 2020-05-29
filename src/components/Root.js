import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loginMode: false
        };
      }

    render() {
        return (
            <View style={{height: '100vh', flexDirection: 'column'}}>
                <Header enableLoginMode={() => this.setState({ loginMode: true })} />
                <View style={{flex: 1, flexDirection: 'row'}}>

                    <View style={{flex: 1}}>
                        <Map />
                    </View>
                    
                    <View style={{width: '25%', minWidth: 350, backgroundColor: "#CCCCCC"}}>
                        <List openLogin={() => this.setState({ loginMode: true })} />
                    </View>
                    
                </View>

                <Login visible={this.state.loginMode} disableLoginMode={() => this.setState({ loginMode: false })}/>
            </View>
        );
    }
}

export default Root;