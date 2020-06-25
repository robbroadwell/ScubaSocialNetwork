import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import Select from 'react-select';
import 'react-dropdown/style.css';
import { setAddDiveSiteMode, fetchDiveSites } from '../../redux/actions';
import { getUser, getMapCenter, getDestinations } from '../../redux/selectors';
import BaseURL from '../../utility/BaseURL';
const axios = require('axios')

export const ADD_STEPS = {
    LOCATION: "LOCATION",
    NAME: "NAME"
}

class DiveSiteAddView extends Component {

  constructor(props) {
      super(props);
      this.state = {
          name: "",
          countryList: [],
          countrySelected: null
      };
    }

  componentDidMount() {
    var list = []
    for(var i = 0; i < this.props.destinations.length; i++) {
      list.push({
        label: this.props.destinations[i].name,
        value: this.props.destinations[i]
      })
    }
    console.log(list)
    this.setState({ countryList: list });
  }

  handleChange = (countrySelected) => {
    console.log(countrySelected)
    this.setState(
      { countrySelected },
      () => console.log(`Option selected:`, this.state.countrySelected)
    );
  };

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  onSelectCountry = input => {
    this.setState({ country: input });
  }

  onSubmitCoordinates = () => {
    var path = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.mapCenter[0] + ',' + this.props.mapCenter[1] + '&key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E' + '&result_type=country'

    axios.get(path).then(function (response) {
      const code = response.data.results[0].address_components[0].short_name
      for(var i = 0; i < this.state.countryList.length; i++) {
        if (this.state.countryList[i].value.code == code) {
          this.setState({ countrySelected: this.state.countryList[i] })
          break
        }
      }
    }.bind(this));
  }

  onCreateDiveSite = (name) => {
    axios({
      method: 'post',
      url: BaseURL() + '/api/dive-sites',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
        name: name,
        latitude: this.props.mapCenter[0],
        longitude: this.props.mapCenter[1],
        destination: {
          id: 'new-zealand',
          name: 'New Zealand'
        }
      }

    }).then(function (response) {
      const {destination, name, _id} = response.data.diveSiteDetail
      this.props.history.push(`/dive-sites/${destination.id}/${name}?id=${_id}`)

    }.bind(this)).catch(error => {
      alert(JSON.stringify(error));
    });
  }

  render() {

    return (
      <View style={{width: 320}}>
        <LocationPicker mapCenter={this.props.mapCenter} />
        <NamePicker />
        <View>
          <Text>{this.state.country}</Text>
          <Select
            value={this.state.countrySelected}
            onChange={this.handleChange}
            options={this.state.countryList}
          />
        </View>

        <View style={{flex: 1}} />
          
        <View>
          <View style={{ flexDirection: 'row', margin: 5, marginBottom: 10}}>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={this.onSubmitCoordinates}>
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#A00000', margin: 10, marginBottom: 5, flex: 1, borderRadius: 5}} onPress={() => this.props.history.goBack()} >
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 5, margin: 10, color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFreeEntry: false,
        freeEntryLatitude: "",
        freeEntryLongtiude: ""
    };
  }

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  onChangeTextLatitude = input => {
    this.setState({ freeEntryLatitude: input });
  }

  onChangeTextLongitude = input => {
    this.setState({ freeEntryLongtiude: input });
  }

  render() {

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 30, height: 30, borderColor: '#A00000', borderWidth: 2, borderRadius: 15}}>
              <Text>1</Text>
            </View>
          </View>
          
          {this.state.isFreeEntry ? 
          <View>
            <TextInput
              style={{backgroundColor: '#CCCCCC', padding: 7, fontSize: 20, margin: 20, marginTop: 5, textAlign: 'center' }}
              onChangeText={text => this.onChangeTextLatitude(text)}
              value={this.state.freeEntryLatitude}
            />
            <TextInput
              style={{backgroundColor: '#CCCCCC', padding: 7, fontSize: 20, margin: 20, marginTop: 5, textAlign: 'center' }}
              onChangeText={text => this.onChangeTextLongitude(text)}
              value={this.state.freeEntryLongitude}
            />
          </View> 
          : 
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Location</Text>
            <Text style={{fontSize: 20, paddingBottom: 16, margin: 5, textAlign: 'center'}}>{Number((this.props.mapCenter[0]).toFixed(5))}, {Number((this.props.mapCenter[1]).toFixed(5))} </Text>
          </View>
          }
        </View>


        <TouchableOpacity onPress={() => this.setState(prevState => ({isFreeEntry: !prevState.isFreeEntry }))} style={{alignItems: 'center', marginBottom: 30}}>
          <Text>{this.state.isFreeEntry ? "Find on Map" : "Free Entry"}</Text>
        </TouchableOpacity>
      </View>
    );
    
  }
}

class NamePicker extends Component {
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
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 30, height: 30, borderColor: '#A00000', borderWidth: 2, borderRadius: 15}}>
                <Text>2</Text>
            </View>
          </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Name</Text>
          <TextInput
            ref={(input) => { this.nameInput = input; }}
            style={{backgroundColor: '#CCCCCC', padding: 7, fontSize: 20, margin: 20, marginTop: 5, textAlign: 'center' }}
            onChangeText={text => this.onChangeName(text)}
            value={this.state.name}
            />
        </View>
      </View>

    )
  }
}

const mapStateToProps = state => {
  const destinations = getDestinations(state);
  const user = getUser(state);
  const mapCenter = getMapCenter(state);
  return { destinations, user, mapCenter };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode, fetchDiveSites }
)(DiveSiteAddView);
