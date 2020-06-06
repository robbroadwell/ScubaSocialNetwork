import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import PopoverButton from './buttons/PopoverButton';
import { withRouter } from 'react-router-dom'
import Login from './Login';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginVisible: false
    };
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      loginVisible: !prevState.loginVisible
    }));
  };

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{width: 375, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={{width: 45, height: 28, marginRight: 15}} source={require('../assets/flag2.svg')} />
            <Image style={{width: 250, height: 40, marginTop: 1}} source={require('../assets/logo_27.svg')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
         <Text style={{marginHorizontal: 45, fontSize: 16, fontWeight: '500'}}>Dive Sites</Text>
         <View style={{backgroundColor: '#A00000', height: 5, width: '70%', bottom: -1, left: '15%', position: 'absolute'}}></View>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>We are brand new! Launched on June 15, 2020.</Text>
          <Text style={{textAlign: 'center'}}>Please check back often for updates, and we welcome comments and suggestions.</Text>
        </View>

        {/* <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Destinations</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Shop</Text>
        <Text style={{marginRight: 45, fontSize: 16, fontWeight: '500'}}>Liveaboards</Text> */}

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20}}>
          <View>
            <PopoverButton action={this.toggleLogin} popover={this.state.loginVisible} title={this.props.user.username ? this.props.user.username : 'Login'} icon={this.state.loginVisible ? require('../assets/drop_up.svg') : require('../assets/drop_down.svg')} >
              <View style={{height: 250, width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                <Login disableLoginMode={this.toggleLogin} />
              </View>
            </PopoverButton>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  {  }
)(withRouter(Header));
