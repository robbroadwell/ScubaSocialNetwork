import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import { setAddDiveSiteMode, fetchDiveSites } from '../../redux/actions';
import { getUser, getMapCenter } from '../../redux/selectors';
const axios = require('axios')


export const ADD_STEPS = {
    LOCATION: "LOCATION",
    NAME: "NAME",
    ADDITIONAL: "ADDITIONAL"
}

class Add extends Component {

  constructor(props) {
      super(props);
      this.state = {
          step: ADD_STEPS.LOCATION,
          name: "",
          country: "",
      };
    }

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  onPressClose = () => {
    this.props.setAddDiveSiteMode(false);
  }

  onPressNameBack = () => {
    this.setState({ step: ADD_STEPS.LOCATION });
    this.props.setAddDiveSiteMode(true);
  }

  onSubmitCoordinates = () => {
    var path = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.mapCenter[0] + ',' + this.props.mapCenter[1] + '&key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E' + '&result_type=country'

    axios.get(path).then(function (response) {
      var country = (response.data.results && response.data.results[0]) ? response.data.results[0].formatted_address : "Ocean"
      this.setState({ country: country, step: ADD_STEPS.NAME });
    }.bind(this));
  }

  onCreateDiveSite = (name) => {

    axios({
      method: 'post',
      url: 'https://www.divingcollective.com/api/dive-sites',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
          name: name,
          country: this.state.country,
          latitude: this.props.mapCenter[0],
          longitude: this.props.mapCenter[1],
      }

    }).then(function (response) {
      this.props.fetchDiveSites()
      this.onPressClose()
    }.bind(this));
  }

  render() {
      switch (this.state.step) {
        case ADD_STEPS.LOCATION:
          return <LocationMode mapCenter={this.props.mapCenter} onPressClose={this.onPressClose} onSubmitCoordinates={this.onSubmitCoordinates} />;
        case ADD_STEPS.NAME:
          return <NameMode onPressNameBack={this.onPressNameBack} onCreateDiveSite={this.onCreateDiveSite}/>;
        default:
          return <LocationMode mapCenter={this.props.mapCenter} onPressClose={this.onPressClose} onSubmitCoordinates={this.onSubmitCoordinates} />;
      }
  }
}

function LocationMode({ mapCenter, onPressClose, onSubmitCoordinates }) {
  return (
    <View style={{flex: 1, width: 350}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Location</Text>
        <Text style={{fontSize: 20, paddingBottom: 16, margin: 5, textAlign: 'center'}}>{Number((mapCenter[0]).toFixed(5))}, {Number((mapCenter[1]).toFixed(5))} </Text>
      </View>

      <View>
        <View style={{ flexDirection: 'row', margin: 5, marginBottom: 10}}>
          <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={onPressClose} >
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={onSubmitCoordinates}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

class NameMode extends Component {
  constructor(props) {
      super(props);
      this.state = {
          name: ""
      };
    }

  componentDidMount(){
    this.nameInput.focus();
  }

  onChangeName = input => {
    this.setState({ name: input });
  };

  render() {
    return (
      <View style={{flex: 1, width: 350}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Name</Text>
          <TextInput
            ref={(input) => { this.nameInput = input; }}
            style={{ padding: 7, fontSize: 20, margin: 20, marginTop: 5, textAlign: 'center' }}
            onChangeText={text => this.onChangeName(text)}
            value={this.state.name}
            />
        </View>

        <View>
          <View style={{ flexDirection: 'row', margin: 5, marginBottom: 10}}>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={this.props.onPressNameBack} >
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={() => this.props.onCreateDiveSite(this.state.name)}>
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  const mapCenter = getMapCenter(state);
  return { user, mapCenter };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode, fetchDiveSites }
)(Add);
