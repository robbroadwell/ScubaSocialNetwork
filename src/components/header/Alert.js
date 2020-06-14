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
    // if (!this.props.alertMode) {
    //   return <View></View>
    // }

    return (
      <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#DDDDDD', margin: 10, flex: 1, textAlign: 'center'}}><span style={{fontWeight: '700'}}>We are brand new!</span> Launched on June 15, 2020. Please check back often for updates, and we welcome any <span style={{textDecorationLine: 'underline', color: '#DDDDDD'}}><TouchableOpacity onPress={this.navigateComments}>comments or suggestions!</TouchableOpacity></span></Text>
        <TouchableOpacity onPress={this.closeAlert} style={{height: '100%', paddingHorizontal: 10}} >
          <Image style={{width: 20, height: 20, tintColor: this.props.style.colors.secondary}} source={require('../../assets/close.png')} />
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
