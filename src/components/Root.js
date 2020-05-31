import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';
import Footer from './Footer';

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
        <Header enableLoginMode={() => this.setState({ loginMode: true })} openLogin={() => this.setState({ loginMode: true })} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '25%', minWidth: 350, backgroundColor: "#FEFEFE"}}>
              <List />
          </View>

          <View style={{flex: 1}}>
              <Map />
          </View>
        </View>
        <Footer />
        <Login visible={this.state.loginMode} disableLoginMode={() => this.setState({ loginMode: false })}/>
      </View>
    );
  }
}

export default Root;
