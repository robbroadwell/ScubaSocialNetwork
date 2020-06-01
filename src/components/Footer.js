import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../redux/selectors";
import { setAddDiveSiteMode } from '../redux/actions';

class Footer extends Component {

  render() {
    return (
      <View style={{backgroundColor: "#FEFEFE", flexDirection: 'row', alignItems: 'center', height: 30, borderTopWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{width: '25%', minWidth: 350, justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.onPressAdd} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
            <Text style={{fontSize: 12, textAlign: 'center',color: '#333333'}}>Are we missing something?</Text>
            <Image style={{height: 20, width: 20, tintColor: '#333333', marginLeft: 10, marginRight: 3}} source={require('../assets/add.svg')} />
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#333333', marginLeft: 5}}>Add a Dive Site</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}} />
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Report a Problem</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Request a Feature</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Privacy</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Terms of Use</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>Sitemap</Text>
        <Text style={{color: '#333333', fontSize: 12, marginHorizontal: 10}}>© 2020, ScubaSoft LLC</Text>
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
)(Footer);
