import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite, setAddDiveSiteMode } from '../redux/actions';
import { getUser, getDiveSites, getSelectedDiveSite, getMapCoordinates, getAddDiveSiteMode } from '../redux/selectors';
import Add from './Add';
import DiveSiteCard from './DiveSiteCard';

class List extends Component {
  onPressAdd = () => {
    if (!this.props.user.username) {
      this.props.openLogin()
    } else {
      this.props.setAddDiveSiteMode(true);
    }
  }

  render() {
    if (this.props.addDiveSiteMode) {
      return <Add />
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView>

              <FlatList
              style={{paddingBottom: 10}}
              data={this.props.diveSites}
              keyExtractor={({ id }, index) => id}
              extraData={this.props.selectedSite}
              renderItem={({ item }) => (
                <DiveSiteCard
                site={item}
                onPress={() => this.props.setSelectedDiveSite(item)}
                selected={this.props.selectedSite._id === item._id}
                />
              )}
              />

            </ScrollView>
          </View>
          <View>
            <View style={{backgroundColor: '#A00000', margin: 10, borderRadius: 5, shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 5}}>
              <TouchableOpacity onPress={this.onPressAdd}>
                <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Add Dive Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  const diveSites = getDiveSites(state);
  const selectedSite = getSelectedDiveSite(state);
  const mapCoordinates = getMapCoordinates(state);
  const addDiveSiteMode = getAddDiveSiteMode(state);
  return { user, diveSites, selectedSite, mapCoordinates, addDiveSiteMode };
};

export default connect(
  mapStateToProps,
  { setSelectedDiveSite, setAddDiveSiteMode }
)(List);
