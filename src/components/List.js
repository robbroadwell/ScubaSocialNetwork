import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite, setAddDiveSiteMode } from '../redux/actions';
import { getUser, getDiveSites, getSelectedDiveSite, getAddDiveSiteMode } from '../redux/selectors';
import Add from './Add';
import Edit from './Edit';
import DiveSiteCard from './DiveSiteCard';

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

  render() {
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
                onPress={() => this.props.setSelectedDiveSite(item)}
                editMode={() => this.onPressEdit(item)}
                selected={this.props.selectedSite && this.props.selectedSite._id === item._id}
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
  const selectedSite = getSelectedDiveSite(state);
  const addDiveSiteMode = getAddDiveSiteMode(state);
  return { user, diveSites, selectedSite, addDiveSiteMode };
};

export default connect(
  mapStateToProps,
  { setSelectedDiveSite, setAddDiveSiteMode }
)(List);
