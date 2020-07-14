import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";
import { setAccountMode, setLoginMode, setRegisterMode, setUser } from '../../redux/actions';
import PrimaryButton from '../buttons/PrimaryButton';
import AutocompleteSearch from '../search/AutocompleteSearch';
import { withRouter, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledLinkNone from '../buttons/StyledLinkNone';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false
    };
  }

  render() {
    if (this.props.style.mobile) {
      return (
        <View>
          <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', alignItems: 'center', height: 60}}>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <StyledLinkNone to="/">
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Image style={{width: 30, height: 20, marginLeft: 15, marginRight: 10}} source={require('../../assets/flag2.svg')} />
                  <Image style={{width: 200, height: 32, marginTop: 2}} source={require('../../assets/logo_light3.svg')} />
                </View>
              </StyledLinkNone>
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity onPress={() => this.setState(prevState => ({ isMobileMenuOpen: !prevState.isMobileMenuOpen}))}>
              <Image style={{width: 30, height: 30, tintColor: 'white', marginRight: 10}} source={this.state.isMobileMenuOpen ? require('../../assets/close.png') : require('../../assets/menu.svg')} />
            </TouchableOpacity>
          </View>
          {this.state.isMobileMenuOpen && (
            <View style={{backgroundColor: 'white'}}>
              <View style={{borderBottomColor: '#CCCCCC', borderBottomWidth: 1}}>
                <StyledLinkNone to="/" style={{color: 'black', padding: 20, fontSize: 16, fontWeight: '500'}}>Home</StyledLinkNone>
              </View>
              <View style={{borderBottomColor: '#CCCCCC', borderBottomWidth: 1}}>
                <StyledLinkNone to="/destinations" style={{color: 'black', padding: 20, fontSize: 16, fontWeight: '500'}}>Destinations</StyledLinkNone>
              </View>
            </View>
          )}
        </View>
      )
    }

    return (
      <View style={{backgroundColor: this.props.style.colors.primary, flexDirection: 'row', alignItems: 'center', height: 60}}>
        
        <View style={{height: '100%', justifyContent: 'center'}}>
          <StyledLinkNone to="/">
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image style={{width: 30, height: 20, marginLeft: 15, marginRight: 10}} source={require('../../assets/flag2.svg')} />
              <Image style={{width: 200, height: 32, marginTop: 2}} source={require('../../assets/logo_light3.svg')} />
            </View>
          </StyledLinkNone>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <StyledLinkNone to="/destinations" style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Destinations</StyledLinkNone>
        </View>

        {/* <View style={{flexDirection: 'row', marginLeft: 30}}>
          <StyledLinkNone to="/photos" style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Photos</StyledLinkNone>
        </View> */}

        <View style={{flex: 1}}></View>

        <View style={{width: 245, height: '100%', justifyContent: 'center'}}>
          <AutocompleteSearch header={true} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
          {this.props.user.token ? <AccountButton logout={() => this.props.setUser([])} /> : <PrimaryButton title={"Join Diving Collective"} action={() => this.props.setRegisterMode(true)} /> }
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
          <AccountDropdown logout={this.props.logout} />
        )}
      </View>
    )
  }
}

function AccountDropdown({ logout }) {
  let history = useHistory();

  return (
    <View style={{position: 'absolute', top: 35, right: 0, backgroundColor: '#FEFEFE', width: 160, shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 15}}>
      <TouchableOpacity onPress={logout} style={{padding: 20}}>
        <Text style={{fontSize: 16}}>Logout</Text>
      </TouchableOpacity>
      {/* <View style={{height: 1, backgroundColor: '#CCCCCC'}} />
      <View style={{marginVertical: 10}}>
        <AccountLink to="/users/Rob">Your Dive Log</AccountLink>
        <AccountLink to="/users/Rob/photos">Your Photos</AccountLink>
        <AccountLink to="/users/Rob/reviews">Your Reviews</AccountLink>
        <AccountLink to="/users/Rob/dive-sites">Your Dive Sites</AccountLink>
      </View>
      <View style={{height: 1, backgroundColor: '#CCCCCC'}} />
      <View style={{marginVertical: 10}}>
        <AccountLink to="/account/settings">Settings</AccountLink>
        <AccountLink to="/account/logout">Logout</AccountLink>
      </View> */}
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
  { setAccountMode, setLoginMode, setRegisterMode, setUser }
)(withRouter(Header));
