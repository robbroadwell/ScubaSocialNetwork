import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite, setAddDiveSiteMode, fetchDiveSites } from '../redux/actions';
import { getUser, getMapCenter } from '../redux/selectors';
import DiveSiteCard from './DiveSiteCard';
import Edit from './Edit';
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
          newDiveSite: [],
          name: "",
          country: "",
          description: "",
          depth: "",
          access: "",
          visibility: "",
          currents: "",
          airTemperature: "",
          waterTemperature: "",
          experienceLevel: ""
      };
    }

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  onChangeTextDescription = input => {
    this.setState({ description: input });
  };

  onChangeTextDepth = input => {
    this.setState({ depth: input });
  };

  onChangeTextAccess = input => {
    this.setState({ access: input });
  };

  onChangeTextVisibility = input => {
    this.setState({ visibility: input });
  };

  onChangeTextCurrents = input => {
    this.setState({ currents: input });
  };

  onChangeTextAirTemperature = input => {
    this.setState({ airTemperature: input });
  };

  onChangeTextWaterTemperature = input => {
    this.setState({ waterTemperature: input });
  };

  onChangeTextExperienceLevel = input => {
    this.setState({ experienceLevel: input });
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
      url: 'http://localhost:8080/api/dive-sites',
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
      this.setState({ step: ADD_STEPS.ADDITIONAL, newDiveSite: response.data.newDiveSite });
    }.bind(this));
  }

  render() {
      switch (this.state.step) {
        case ADD_STEPS.LOCATION:
          return <LocationMode mapCenter={this.props.mapCenter} onPressClose={this.onPressClose} onSubmitCoordinates={this.onSubmitCoordinates} />;
        case ADD_STEPS.NAME:
          return <NameMode onPressNameBack={this.onPressNameBack} onCreateDiveSite={this.onCreateDiveSite}/>;
        case ADD_STEPS.ADDITIONAL:
          return <Edit site={this.state.newDiveSite} closeEditing={this.onPressClose} sourceAdd={true} />;
        default:
          return <LocationMode mapCenter={this.props.mapCenter} onPressClose={this.onPressClose} onSubmitCoordinates={this.onSubmitCoordinates} />;
      }
  }
}

function LocationMode({ mapCenter, onPressClose, onSubmitCoordinates }) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Location</Text>
        <Text style={{fontSize: 20, paddingBottom: 16, margin: 5, textAlign: 'center'}}>{Number((mapCenter[0]).toFixed(5))}, {Number((mapCenter[1]).toFixed(5))} </Text>
      </View>

      <View>
        <View style={{ flexDirection: 'row', margin: 5, marginBottom: 0}}>
          <TouchableOpacity style={{backgroundColor: '#A00000', margin: 5, marginBottom: 0, flex: 1, borderRadius: 5}} onPress={onPressClose} >
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#A00000', margin: 5, marginBottom: 0, flex: 1, borderRadius: 5}} onPress={onSubmitCoordinates}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'black', fontSize: 12, margin: 10, textAlign: 'center'}}>© 2020 Richard Broadwell, All Rights Reserved</Text>
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
      <View style={{flex: 1}}>
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
          <View style={{ flexDirection: 'row', margin: 5, marginBottom: 0}}>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 5, marginBottom: 0, flex: 1, borderRadius: 5}} onPress={this.props.onPressNameBack} >
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 5, marginBottom: 0, flex: 1, borderRadius: 5}} onPress={() => this.props.onCreateDiveSite(this.state.name)}>
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'black', fontSize: 12, margin: 10, textAlign: 'center'}}>© 2020 Richard Broadwell, All Rights Reserved</Text>
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
  { setSelectedDiveSite, setAddDiveSiteMode, fetchDiveSites }
)(Add);
