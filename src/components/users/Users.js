import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setAccountMode } from "../../redux/actions";
import { getUser, getLoginMode } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
const axios = require('axios')

class Users extends Component {

  onPressLogout = () => {
    this.props.history.push(`/`)
    this.props.setUser([]);
  }

  render() {
    console.log(this.props.match.params.id)
    console.log(this.props.match.params.tab)

    return (
      <View style={{flexDirection: 'row', height: 500}}>
        <View style={{flex: 3, alignItems: 'center'}}>
          <View style={{position: 'absolute', top: 65, width: '100%', height: 1, backgroundColor: '#CCCCCC'}} />
          <View style={{width: 280, height: 280, marginTop: 40, marginLeft: 10, borderRadius: 140, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{height: 28, width: 18, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
          </View>
        </View>
        <View style={{flex: 8}}>
          <View style={{height: 66, borderBottomWidth: 1, borderBottomColor: "#CCCCCC", flexDirection: 'row', alignItems: 'flex-end'}}>
            <MenuItem title={"Overview"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}`)} selected={!this.props.match.params.tab} icon={require('../../assets/account.svg')} />
            <MenuItem title={"Dive Log"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}/dive-log`)} selected={this.props.match.params.tab === "dive-log"} icon={require('../../assets/numbered.png')} />
            <MenuItem title={"Photos"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}/photos`)} selected={this.props.match.params.tab === "photos"} icon={require('../../assets/camera.png')} />
            <MenuItem title={"Reviews"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}/reviews`)} selected={this.props.match.params.tab === "reviews"} icon={require('../../assets/review.svg')} />
            <MenuItem title={"Dive Sites"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}/dive-sites`)} selected={this.props.match.params.tab === "dive-sites"} icon={require('../../assets/pin.png')} />
          </View>
        </View>
      </View>
    )
  }
}

function MenuItem({ title, icon, selected, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: selected ? 12 : 14, paddingHorizontal: 15, borderBottomColor: '#A00000', borderBottomWidth: selected ? 2 : 0}}>
      <Image style={{height: 15, width: 15, marginRight: 7, tintColor: selected ? 'black' : '#333333'}} source={icon} />
      <Text style={{fontSize: 15, color: selected ? 'black' : '#333333', fontWeight: selected ? '700' : '400'}}>{title}</Text>
    </TouchableOpacity>
  )
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

  export default connect(
    mapStateToProps,
    { setUser, setAccountMode }
  )(withRouter(Users));
