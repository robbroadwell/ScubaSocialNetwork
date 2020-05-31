import React, {Component} from 'react';
import { View } from 'react-native';

import Header from './Header';
import List from './List';
import Login from './Login';
import Map from './Map';
import Footer from './Footer';
import Result from './Result';

import { connect } from "react-redux";
import { setSelectedDiveSite } from '../redux/actions';
import { getSelectedDiveSite } from '../redux/selectors';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginMode: false
    };
  }

  render() {
    console.log(this.props.selectedSite)
    return (
      <View style={{height: '100vh', flexDirection: 'column'}}>
        <Header openLogin={() => this.setState({ loginMode: true })} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '25%', minWidth: 350, backgroundColor: "#FEFEFE"}}>
              <List openLogin={() => this.setState({ loginMode: true })}/>
          </View>

          <View style={{flex: 1}}>
            <Map />
            <Result site={this.props.selectedSite} />
          </View>
        </View>
        <Footer openLogin={() => this.setState({ loginMode: true })} />
        <Login visible={this.state.loginMode} disableLoginMode={() => this.setState({ loginMode: false })}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const selectedSite = getSelectedDiveSite(state);
  return { selectedSite };
};

export default connect(
  mapStateToProps,
  { setSelectedDiveSite }
)(Root);
