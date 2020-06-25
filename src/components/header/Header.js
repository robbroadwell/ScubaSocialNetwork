import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setLoginMode } from '../../redux/actions';
import PrimaryButton from '../buttons/PrimaryButton';
import { withRouter } from 'react-router-dom'

class Header extends Component {

  toggleLogin = () => {
    this.props.setLoginMode(!this.props.loginMode)
  };

  render() {
    return (
      <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', alignItems: 'center', height: 60}}>
        
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{width: 30, height: 20, marginHorizontal: 15}} source={require('../../assets/flag2.svg')} />
            <Image style={{width: 200, height: 32, marginTop: 2}} source={require('../../assets/logo_light3.svg')} />
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginHorizontal: 30}}>
          <TouchableOpacity onPress={() => this.props.history.push(`/destinations`)}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginRight: 20}}>Destinations</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => this.props.history.push(`/dive-sites`)}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginRight: 20}}>Top Dive Sites</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => this.props.history.push(`/photos`)}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginRight: 20}}>Best Photos</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => this.props.history.push(`/leaderboard`)}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginRight: 20}}>Leaderboard</Text>
          </TouchableOpacity> */}
{/* 
          <TouchableOpacity onPress={() => this.props.history.push(`/explore`)}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginRight: 20}}>Explore</Text>
          </TouchableOpacity> */}

          
        </View>

        <View style={{flex: 1}} ></View>

        {/* <View style={{width: 200, height: '100%'}}>
          <View style={{flex: 1, marginVertical: 13, padding: 10, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text>Search</Text>
          </View>
        </View> */}

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          <PrimaryButton title={this.props.user.username ? "Account" : "Join Diving Collective"} action={this.toggleLogin} />
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
  { setLoginMode }
)(withRouter(Header));
