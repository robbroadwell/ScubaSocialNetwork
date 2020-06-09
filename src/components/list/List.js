import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from "react-redux";
import { setAddDiveSiteMode, setLoginMode } from '../../redux/actions';
import { getUser, getDiveSites, getAddDiveSiteMode } from '../../redux/selectors';
import Add from './Add';
import Edit from '../result/ResultEdit';
import DiveSiteCard from './DiveSiteCard';
import { withRouter } from 'react-router-dom'
import qs from 'qs';

class List extends Component {
  constructor(props) {
      super(props);
      this.state = {
          editing: null
      };
    }

  onPressAdd = () => {
    if (!this.props.user.username) {
      this.props.setLoginMode(true)
    } else {
      this.props.history.push(`/`)
      this.props.setAddDiveSiteMode(true)
    }
  }

  selectDiveSite = (site) => {
    if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id === site._id) {
      this.props.history.push(`/`)
    } else {
      this.props.history.push(`/dive-sites/${site.country.replace(/\s+/g, '-').toLowerCase()}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
    }
  }

  render() {
    if (this.props.location.pathname === "/privacy" || this.props.location.pathname === "/contact" || this.props.location.pathname === "/conditions") {
      return (
      <View style={{minWidth: 350, flex: 1}}>
        <View style={{flex: 1}} />
        <View style={{flexDirection: 'column', justifyContent: 'center', margin: 20, alignItems: 'center', marginHorizontal: 10}}>
          <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#333333'}}>© 2020, Broadwell LLC, or its affiliates</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
              <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Conditions of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
              <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Privacy Notice</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
              <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )
    }

    const selectedID = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    if (this.props.addDiveSiteMode) {
      return <Add />
    } else if (!this.state.editing) {
      return (
        <ScrollView style={{minWidth: 350, flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={{minHeight: '90vh'}}>
            <FlatList
            style={{paddingBottom: 4}}
            data={this.props.diveSites}
            keyExtractor={({ id }, index) => id}
            extraData={this.props.selectedSite}
            renderItem={({ item }) => (
              <DiveSiteCard
              site={item}
              onPress={() => this.selectDiveSite(item)}
              editMode={() => this.onPressEdit(item)}
              selected={selectedID === item._id}
              />
            )}
            />

            <TouchableOpacity onPress={this.onPressAdd} style={{flexDirection: 'column', justifyContent: 'center', margin: 20, alignItems: 'center', marginHorizontal: 10}}>
              <Text style={{fontSize: 13, textAlign: 'center',color: '#333333'}}>Are we missing something?</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image style={{height: 20, width: 20, tintColor: '#333333', marginRight: 3}} source={require('../../assets/add.svg')} />
                <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#333333'}}>Add a Dive Site</Text>
              </View>
            </TouchableOpacity>

            <View style={{flex: 1}} />

            <View style={{flexDirection: 'column', justifyContent: 'center', margin: 20, alignItems: 'center', marginHorizontal: 10}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#333333'}}>© 2020, Broadwell LLC, or its affiliates</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
                  <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Conditions of Use</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
                  <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Privacy Notice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
                  <Text style={{fontSize: 12, textAlign: 'center',color: '#333333', marginLeft: 10}}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      )
    } else {
      return <Edit site={this.state.editing} closeEditing={this.closeEditing} />
    }
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  const diveSites = getDiveSites(state);
  const addDiveSiteMode = getAddDiveSiteMode(state);
  return { user, diveSites, addDiveSiteMode };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode, setLoginMode }
)(withRouter(List));
