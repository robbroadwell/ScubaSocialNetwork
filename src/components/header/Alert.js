import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { getUser, getAlertMode } from "../../redux/selectors";
import { setAddDiveSiteMode, setAlertMode } from '../../redux/actions';

class Alert extends Component {

  navigateComments = () => {
    this.props.setAlertMode(false);
    this.props.history.push(`/contact`)
  }

  closeAlert = () => {
    this.props.setAlertMode(false);
  }

  render() {
    if (!this.props.alertMode) {
      return <View></View>
    }

    return (
      <View style={{backgroundColor: "#21313C", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40}}>
        <Text style={{color: '#DDDDDD'}}><span style={{fontWeight: '700'}}>We are brand new!</span> Launched on June 15, 2020. Please check back often for updates, and we welcome any </Text>
        <TouchableOpacity onPress={this.navigateComments}>
          <Text style={{textDecorationLine: 'underline', color: '#DDDDDD'}}>comments or suggestions!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.closeAlert} style={{position: 'absolute', right: 0, height: '100%', paddingHorizontal: 10, justifyContent: 'center'}} >
          <Image style={{width: 20, height: 20, tintColor: 'white'}} source={require('../../assets/close.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  const alertMode = getAlertMode(state);
  return { user, alertMode };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode, setAlertMode }
)(Alert);
