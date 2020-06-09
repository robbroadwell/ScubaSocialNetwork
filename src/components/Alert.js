import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import { setAddDiveSiteMode } from '../redux/actions';

class Alert extends Component {

  render() {
    return (
      <View style={{backgroundColor: "#540B0E", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, borderTopWidth: 1, borderColor: "#DDDDDD"}}>
        <Text style={{color: '#DDDDDD'}}>We are brand new! Launched on June 15, 2020. Please check back often for updates, and we welcome any </Text>
        <Text style={{textDecorationLine: 'underline', color: '#DDDDDD'}}>comments or suggestions!</Text>
        <TouchableOpacity style={{position: 'absolute', right: 0, height: '100%', paddingHorizontal: 10, justifyContent: 'center'}} >
          <Image style={{width: 20, height: 20, tintColor: 'white'}} source={require('../assets/close.png')} />
        </TouchableOpacity>
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
  { setAddDiveSiteMode }
)(Alert);
