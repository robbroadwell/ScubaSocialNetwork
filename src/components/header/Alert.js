import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setAddDiveSiteMode } from '../../redux/actions';

class Alert extends Component {

  render() {
    return (
      <View style={{backgroundColor: "#21313C", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30}}>
        <Text style={{color: '#DDDDDD'}}>We are brand new! Launched on June 15, 2020. Please check back often for updates, and we welcome any </Text>
        <TouchableOpacity>
          <Text style={{textDecorationLine: 'underline', color: '#DDDDDD'}}>comments or suggestions!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', right: 0, height: '100%', paddingHorizontal: 10, justifyContent: 'center'}} >
          <Image style={{width: 20, height: 20, tintColor: 'white'}} source={require('../../assets/close.png')} />
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
