import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setAccountMode, setLoginMode, setRegisterMode } from '../../redux/actions';
import PrimaryButton from '../buttons/PrimaryButton';
import AutocompleteSearch from '../search/AutocompleteSearch';
import { withRouter } from 'react-router-dom'

class Header extends Component {


  render() {
    console.log(this.props.user)
    return (
      <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', alignItems: 'center', height: 60}}>
        
        <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{width: 30, height: 20, marginHorizontal: 15}} source={require('../../assets/flag2.svg')} />
            <Image style={{width: 200, height: 32, marginTop: 2}} source={require('../../assets/logo_light3.svg')} />
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <TouchableOpacity onPress={() => this.props.history.push(`/destinations`)}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Destinations</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <TouchableOpacity onPress={() => this.props.history.push(`/photos`)}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Photos</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}></View>

        <View style={{width: 245, height: '100%', justifyContent: 'center'}}>
          <AutocompleteSearch header={true} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          {this.props.user.token ? <AccountButton /> : <PrimaryButton title={"Join Diving Collective"} action={() => this.props.setRegisterMode(true)} /> }
        </View>
      </View>
    )
  }
}

function AccountButton() {
  return (
    <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 5, alignItems: 'center'}}>
      <View style={{width: 30, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CCCCCC'}}>
        <Image style={{height: 20, width: 12, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
      </View>
      <Image style={{width: 25, height: 15, tintColor: '#CCCCCC'}} source={require('../../assets/arrow_down.svg')} />
    </View>
  )
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { setAccountMode, setLoginMode, setRegisterMode }
)(withRouter(Header));
