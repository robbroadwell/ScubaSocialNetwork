import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import { setSelectedDiveSite, setAddDiveSiteMode } from '../redux/actions';
import { getUser, getMapCoordinates } from '../redux/selectors';
const axios = require('axios')

class Edit extends Component {
  constructor(props) {
      super(props);
      this.state = {
          name: "",
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

  onPressSubmit = () => {
    if (this.state.name === "") {
      return
    }

    var path = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.mapCoordinates[0] + ',' + this.props.mapCoordinates[1] + '&key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E' + '&result_type=country'

    axios.get(path).then(function (response) {
      var country = (response.data.results && response.data.results[0]) ? response.data.results[0].formatted_address : "Ocean"

      axios({
        method: 'post',
        url: 'https://www.divingscore.com/api/dive-sites',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this.props.user.token
        },
        data: {
            name: this.state.name,
            country: country,
            latitude: this.props.mapCoordinates[0],
            longitude: this.props.mapCoordinates[1],
            description: this.state.description,
            depth: this.state.depth,
            access: this.state.access,
            visibility: this.state.visibility,
            currents: this.state.currents,
            airTemperature: this.state.airTemperature,
            waterTemperature: this.state.waterTemperature,
            experienceLevel: this.state.experienceLevel

        }

      }).then(function (response) {
            this.setState({ name: "" });
            this.props.setAddDiveSiteMode(false);
          }.bind(this));
    }.bind(this))
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
                style={{ height: 120, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextDescription(text)}
                placeholder={'Description'}
                multiline={true}
                value={this.state.description}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextDepth(text)}
                placeholder={'Depth'}
                value={this.state.depth}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextAccess(text)}
                placeholder={'Access'}
                value={this.state.access}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextVisibility(text)}
                placeholder={'Visibility'}
                value={this.state.visibility}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextCurrents(text)}
                placeholder={'Currents'}
                value={this.state.currents}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextWaterTemperature(text)}
                placeholder={'Water Temperature'}
                value={this.state.waterTemperature}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextAirTemperature(text)}
                placeholder={'Air Temperature'}
                value={this.state.airTemperature}
                />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={text => this.onChangeTextExperienceLevel(text)}
                placeholder={'Experience Level'}
                value={this.state.experienceLevel}
                />
          </View>
        </View>

        <View>
          <View style={{backgroundColor: '#A00000', margin: 10, borderRadius: 5, opacity: (this.state.name === "" || this.state.country === "") ? 0.4 : 1.0}}>
            <TouchableOpacity onPress={this.onPressSubmit} disabled={this.state.name === "" || this.state.country === ""}>
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
)(Edit);
