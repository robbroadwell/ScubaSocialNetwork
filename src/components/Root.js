import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';
import Footer from './Footer';
import Result from './Result';

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginMode: false
    };
  }

  render() {
    return (
      <Router>
        <View style={{height: '100vh', flexDirection: 'column'}}>
          <Header openLogin={() => this.setState({ loginMode: true })} />
          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{width: '25%', minWidth: 350, backgroundColor: "#FEFEFE"}}>
              <Route path="/" >
                <List openLogin={() => this.setState({ loginMode: true })}/>
              </Route>
            </View>

            <View style={{flex: 1}}>
              <Route path="/" component={Map} />
              <Route path="/dive-sites" component={Result} />
            </View>

          </View>
          <Login visible={this.state.loginMode} disableLoginMode={() => this.setState({ loginMode: false })}/>
        </View>
      </Router>
      
    );
  }
}

const mapStateToProps = state => {
  return {  };
};

export default connect(
  mapStateToProps,
  {  }
)(Root);
