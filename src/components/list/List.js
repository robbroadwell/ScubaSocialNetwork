import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import DiveSiteCard from './DiveSiteCard';

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
          <FlatList
            style={{paddingBottom: 4}}
            data={this.props.diveSites}
            keyExtractor={({ id }, index) => id}
            // extraData={this.props.selectedSite}
            renderItem={({ item }) => (
              <DiveSiteCard
              site={item}
              onPress={() => this.selectDiveSite(item)}
              editMode={() => this.onPressEdit(item)}
              // selected={selectedID === item._id}
              />
            )}
          />
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#333333'}}>© 2020, Broadwell LLC, or its affiliates</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

        </ScrollView>
      </View>
    )
  }
}

export default List;