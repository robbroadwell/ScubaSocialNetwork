import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import {  setAddDiveSiteMode } from '../redux/actions';
import { getUser, getDiveSites, getAddDiveSiteMode } from '../redux/selectors';
import Add from './Add';
import Edit from './Edit';
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

  onPressEdit = (site) => {
    if (!this.props.user.username) {
      this.props.openLogin()
    } else {
      this.setState({ editing: site });
    }
  }

  closeEditing = () => {
    this.setState({ editing: null });
  }

  selectDiveSite = (site) => {
    if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id === site._id) {
      this.props.history.push(`/`)
    } else {
      this.props.history.push(`/dive-sites/${site.country.replace(/\s+/g, '-').toLowerCase()}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
    }
  }

  render() {
    const selectedID = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    if (this.props.addDiveSiteMode) {
      return <Add />
    } else if (!this.state.editing) {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: '#FEFEFE'}}>
            <ScrollView>

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

            </ScrollView>
          </View>
        </View>
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
  { setAddDiveSiteMode }
)(withRouter(List));
