import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";

class Header extends Component {

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 70, borderBottomWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{width: '25%', minWidth: 350, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Image style={{width: 45, height: 28, marginRight: 15}} source={require('../assets/flag2.svg')} />
          <Image style={{width: 250, height: 40, marginTop: 5}} source={require('../assets/logo_23.svg')} />
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 40}}>
              <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>Dive Sites</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 40}}>
              <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>Destinations</Text>
              <Image style={{height: 20, width: 20, tintColor: '#333333'}} source={require('../assets/drop_down.svg')} />
            </TouchableOpacity> */}
          </View>

          <TouchableOpacity onPress={this.props.openLogin} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{textAlign: 'right', color: '#333333', fontWeight: 'bold', fontSize: 16}}>{
                this.props.user.username ? this.props.user.username : 'Login'
            }</Text>
            <Image style={{height: 20, width: 20, tintColor: '#333333'}} source={require('../assets/drop_down.svg')} />
          </TouchableOpacity>

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
