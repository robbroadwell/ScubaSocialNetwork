import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { setAddDiveSiteMode, fetchDiveSites } from '../redux/actions';
import { getUser } from '../redux/selectors';
import DiveSiteCard from './DiveSiteCard';
import PrimaryButton from './buttons/PrimaryButton';
const axios = require('axios')

class Edit extends Component {
  constructor(props) {
      super(props);
      this.state = {
          description: props.site.details ? props.site.details.description : null,
          depth: props.site.details ? props.site.details.depth : null,
          access: props.site.details ? props.site.details.access : null,
          visibility: props.site.details ? props.site.details.visibility : null,
          currents: props.site.details ? props.site.details.currents : null,
          airTemperature: props.site.details ? props.site.details.airTemperature : null,
          waterTemperature: props.site.details ? props.site.details.waterTemperature : null,
          experienceLevel: props.site.details ? props.site.details.experienceLevel : null
      };
    }

  onChangeTextDescription = input => {
    console.log(input)
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

  onPressSubmit = () => {
    console.log(this.props.site._id)
    axios({
      method: 'put',
      url: 'http://localhost:8080/api/dive-sites',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
          id: this.props.site._id,
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
      this.props.fetchDiveSites()
      this.props.toggleEdit()
    }.bind(this));
  }

  render() {
    return (
      <View style={{flexDirection: 'row', position: 'absolute', width: '100%', height: '100%', backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{flex: 1, flexDirection: 'column', margin: 20, marginRight: 0}}>
          <View style={{flexDirection: 'row'}} >
            <Text style={{fontSize: 28, fontWeight: '300', marginRight: 20}}>{this.props.site.name}, {this.props.site.country}</Text>
            <PrimaryButton action={this.onPressSubmit} title={"Submit"} />
            <PrimaryButton action={this.props.toggleEdit} title={"Cancel"} />
          </View>
          <TextInput
            style={{ height: 340, borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}
            onChangeText={text => this.onChangeTextDescription(text)}
            placeholder={'Description'}
            multiline={true}
            value={this.state.description}
            />
          <TextInput/>
        </View>
        <View style={{width: 320, margin: 20, marginTop: 45, marginLeft: 0}}>
          <View style={{borderColor: "#DDDDDD", padding: 20}}>
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
      </View>

    );
  }
}


const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode, fetchDiveSites }
)(Edit);
