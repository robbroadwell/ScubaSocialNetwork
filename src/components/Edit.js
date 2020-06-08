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
          description: props.site.details && props.site.details.description.length > 0 ? props.site.details.description[props.site.details.description.length - 1].content : null,
          depth: props.site.details && props.site.details.depth.length > 0 ? props.site.details.depth[props.site.details.depth.length - 1].content : null,
          visibility: props.site.details && props.site.details.visibility.length > 0 ? props.site.details.visibility[props.site.details.visibility.length - 1].content : null,
          difficulty: props.site.details && props.site.details.difficulty.length > 0 ? props.site.details.difficulty[props.site.details.difficulty.length - 1].content : null,
          access: props.site.details && props.site.details.access.length > 0 ? props.site.details.access[props.site.details.access.length - 1].content : null,
          currents: props.site.details && props.site.details.currents.length > 0 ? props.site.details.currents[props.site.details.currents.length - 1].content : null,

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

  onChangeTextDifficulty = input => {
    this.setState({ difficulty: input });
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
          difficulty: this.state.difficulty
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
              onChangeText={text => this.onChangeTextDifficulty(text)}
              placeholder={'Difficulty'}
              value={this.state.difficulty}
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
