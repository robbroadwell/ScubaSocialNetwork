import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import PopoverButton from './buttons/PopoverButton';
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
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 65, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{width: 375, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={{width: 45, height: 28, marginRight: 15}} source={require('../assets/flag2.svg')} />
          <Image style={{width: 250, height: 40, marginTop: 1}} source={require('../assets/logo_23.svg')} />
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20}}>
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
)(Header);
