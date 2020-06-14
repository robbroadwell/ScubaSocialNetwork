import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import DiveSiteList from './DiveSiteList';
import Legal from './Legal';

class List extends Component {
  render() {

    if (this.props.style.mobile) {
      if (!this.props.diveSites || this.props.diveSites.length === 0) {
        return <View></View> // no dive sites
      } else {
        return (
          <TouchableOpacity style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0, top: window.screen.height / 2, width: 50, height: 50, backgroundColor: this.props.style.colors.secondary}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>{this.props.diveSites.length}</Text>
          </TouchableOpacity>
        )
      }
    }

    return (
      <View style={{backgroundColor: this.props.style.colors.secondary, minWidth: 320}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <DiveSiteList diveSites={this.props.diveSites} />
          <Legal />
        </ScrollView>
      </View>
    )
  }
}

export default List;