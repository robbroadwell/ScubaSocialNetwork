import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setAccountMode, setLoginMode, setRegisterMode } from '../../redux/actions';
import PrimaryButton from '../buttons/PrimaryButton';
import AutocompleteSearch from '../search/AutocompleteSearch';
import { withRouter, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
          {this.props.user.token ? <AccountButton history={this.props.history} /> : <PrimaryButton title={"Join Diving Collective"} action={() => this.props.setRegisterMode(true)} /> }
        </View>
      </View>
    )
  }
}

class AccountButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isExpanded: false,
    };
  }

  render() {
    console.log(this.props.history)
    console.log(this.state.isExpanded)
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))} style={{flexDirection: 'row', marginLeft: 15, marginRight: 5, alignItems: 'center'}}>
          <View style={{width: 30, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CCCCCC'}}>
            <Image style={{height: 20, width: 12, marginRight: 2, tintColor: 'white'}} source={require('../../assets/d_logo.svg')} />
          </View>
          <Image style={{width: 25, height: 15, tintColor: '#CCCCCC'}} source={require('../../assets/arrow_down.svg')} />
        </TouchableOpacity>
        {this.state.isExpanded && (
          <AccountDropdown />
        )}
      </View>
    )
  }
}

function AccountDropdown() {
  let history = useHistory();

  return (
    <View style={{position: 'absolute', top: 35, right: 0, backgroundColor: '#FEFEFE', width: 160, shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 15}}>
      <TouchableOpacity onPress={() => history.push('/users/Rob')} style={{padding: 10, marginTop: 5}}>
        <Text style={{fontSize: 16}}>Signed in as:</Text>
        <Text style={{paddingVertical: 5, fontSize: 16, fontWeight: '600'}}>Rob</Text>
      </TouchableOpacity>
      <View style={{height: 1, backgroundColor: '#CCCCCC'}} />
      <View style={{marginVertical: 10}}>
        <AccountLink to="/users/Rob">Your Profile</AccountLink>
        <AccountLink to="/users/Rob/logged-dives">Your Logged Dives</AccountLink>
        <AccountLink to="/users/Rob/photos">Your Photos</AccountLink>
        <AccountLink to="/users/Rob/reviews">Your Reviews</AccountLink>
        <AccountLink to="/users/Rob/dive-sites">Your Dive Sites</AccountLink>
        <AccountLink to="/users/Rob/favorites">Your Favorites</AccountLink>
      </View>
      <View style={{height: 1, backgroundColor: '#CCCCCC'}} />
      <View style={{marginVertical: 10}}>
        <AccountLink to="/account/settings">Settings</AccountLink>
        <AccountLink to="/account/logout">Logout</AccountLink>
      </View>
    </View>
  )
}

const AccountLink = styled(Link)`
    text-decoration: none;
    color: #000000;
    padding: 0.5rem;

    &:hover {
      color: #FFFFFF;
      background-color: rgba(160, 0, 0, 1);
    }
`;

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { setAccountMode, setLoginMode, setRegisterMode }
)(withRouter(Header));
