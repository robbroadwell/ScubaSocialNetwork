import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite, setAddDiveSiteMode } from '../redux/actions';
import { getUser, getMapCoordinates } from '../redux/selectors';
const axios = require('axios')

class Add extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          name: "",
          country: ""
      };
    }

  onChangeTextName = input => {
      this.setState({ name: input });
  };

  onChangeTextCountry = input => {
      this.setState({ country: input });
  };

  onPressClose = () => {
    this.props.setAddDiveSiteMode(false);
  }

  onPressSubmit = () => {
    
      if (this.state.name !== "" && this.state.country !== "") {
        axios({
          method: 'post',
          url: 'https://www.divingscore.com/api/dive-sites',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.user.token
          },
          data: {
            name: this.state.name,
              country: this.state.country,
              latitude: this.props.mapCoordinates[0],
              longitude: this.props.mapCoordinates[1]
          }
        }).then(function (response) {
              console.log(response);
              this.setState({ name: "", country: "" });
              this.props.setAddDiveSiteMode(false);
                  // this.props.setUser(response.data.user);
                  // this.props.disableLoginMode();
            }.bind(this));
      }
  }

  render() {
      return (
          <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                  <View style={{margin: 5, marginBottom: 0, padding: 20, paddingTop: 16, backgroundColor: '#FEFEFE', shadowColor: '#000',
                      borderColor: "#A00000",
                      borderRadius: 3,
                      // borderWidth: selected ? 2 : 0,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.3,
                      shadowRadius: 5}}>
                        <Text style={{fontSize: 16, paddingBottom: 16}}>{Number((this.props.mapCoordinates[0]).toFixed(5))}, {Number((this.props.mapCoordinates[1]).toFixed(5))} </Text>
                          <TextInput
                              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                              onChangeText={text => this.onChangeTextName(text)}
                              placeholder={'Name*'}
                              value={this.state.name}
                              />
                          <TextInput
                              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                              onChangeText={text => this.onChangeTextCountry(text)}
                              placeholder={'Country*'}
                              value={this.state.country}
                              />
                      
                  </View>
              </View>
  
              <View>
                  <View style={{backgroundColor: '#A00000', margin: 10, borderRadius: 5, opacity: (this.state.name == "" || this.state.country == "") ? 0.4 : 1.0}}>
                      <TouchableOpacity onPress={this.onPressSubmit} disabled={this.state.name == "" || this.state.country == ""}>
                          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Add Dive Site</Text>
                      </TouchableOpacity>
                  </View>
              </View>
  
              <TouchableOpacity style={{position: 'absolute', top: 12, right: 10}} onPress={this.onPressClose}>
                  <Image style={{height: 25, width: 25, margin: 5, tintColor: 'black'}} source={require('../assets/close.png')} />
              </TouchableOpacity>
          </View>
      );
  }
}


const mapStateToProps = state => {
  const user = getUser(state);
  const mapCoordinates = getMapCoordinates(state);
  return { user, mapCoordinates };
};

export default connect(
  mapStateToProps,
  { setSelectedDiveSite, setAddDiveSiteMode }
)(Add);
