import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import PrimaryButton from './PrimaryButton';

class Header extends Component {

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 65, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{width: 400, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Image style={{width: 45, height: 28, marginRight: 15}} source={require('../assets/flag2.svg')} />
          <Image style={{width: 250, height: 40, marginTop: 1}} source={require('../assets/logo_23.svg')} />
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 40}}>
              <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>Dive Sites</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 40}}>
              <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>Leaders</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 40}}>
              <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>Shop</Text>
            </TouchableOpacity> */}
          </View>

          <PrimaryButton action={this.props.openLogin} title={this.props.user.username ? this.props.user.username : 'Login'} icon={require('../assets/drop_down.svg')} />

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
