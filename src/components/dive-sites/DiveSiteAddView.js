import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from "react-redux";
import Select from 'react-select';
import 'react-dropdown/style.css';
import { setAddDiveSiteMode } from '../../redux/actions';
import { getUser, getMapCenter, getDestinations } from '../../redux/selectors';
import BaseURL from '../../utility/BaseURL';
const axios = require('axios')

class DiveSiteAddView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        step: 1,
        name: "",
        countryList: [],
        countrySelected: null,
        isFreeEntry: false,
        freeEntryLatitude: "",
        freeEntryLongitude: ""
    };
  }

  componentDidMount() {
    this.buildDropdown()
  }

  buildDropdown = () => {
    var list = []
    for(var i = 0; i < this.props.destinations.length; i++) {
      list.push({
        label: this.props.destinations[i].name,
        value: this.props.destinations[i]
      })
    }
    console.log(this.props.destinations)
    this.setState({ countryList: list });
  }

  handleNextStep = () => {
    if(this.state.step === 3) {
      this.createDiveSite()
    } else {
      if(this.state.step === 1) {
        this.lookupCountryName()
      }
      this.setState(prevState => ({
        step: prevState.step + 1
      }))
    }
  }

  handleCountrySelect = (countrySelected) => {
    this.setState(
      { countrySelected }
    );
  };

  toggleFreeEntry = () => {
    this.setState(prevState => ({
      isFreeEntry: !prevState.isFreeEntry
    }))
  }

  onChangeTextLatitude = input => {
    this.setState({ freeEntryLatitude: input });
  }

  onChangeTextLongitude = input => {
    this.setState({ freeEntryLongitude: input });
  }

  onChangeTextName = input => {
    this.setState({ name: input });
  };

  lookupCountryName = () => {
    const latitude = this.state.isFreeEntry ? this.state.freeEntryLatitude : this.props.mapCenter[0]
    const longitude = this.state.isFreeEntry ? this.state.freeEntryLongitude : this.props.mapCenter[1]

    var path = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E' + '&result_type=country'

    axios.get(path).then(function (response) {
      if (!response.data.results[0]) {
        return
      }

      const code = response.data.results[0].address_components[0].short_name
      for(var i = 0; i < this.state.countryList.length; i++) {
        if (this.state.countryList[i].value.code == code) {
          this.setState({ countrySelected: this.state.countryList[i] })
          break
        }
      }
    }.bind(this));
  }

  createDiveSite = () => {
    const latitude = this.state.isFreeEntry ? Number(this.state.freeEntryLatitude) : this.props.mapCenter[0]
    const longitude = this.state.isFreeEntry ? Number(this.state.freeEntryLongitude) : this.props.mapCenter[1]
    const name = this.state.countrySelected.value.name
    const id = this.state.countrySelected.value._id

    axios({
      method: 'post',
      url: BaseURL() + '/api/dive-sites',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
        name: this.state.name,
        latitude: latitude,
        longitude: longitude,
        destination: {
          id: id,
          name: name
        }
      }

    }).then(function (response) {
      const {destination, name, _id} = response.data.diveSiteDetail
      this.props.history.push(`/dive-sites/${destination.id}/${name.replace(/\s+/g, '-').toLowerCase()}?id=${_id}`)

    }.bind(this)).catch(error => {
      console.log(error)
    });
  }

  render() {

    return (
      <View style={{width: 320, marginTop: 20, flexDirection: 'column-reverse', justifyContent: 'flex-end'}}>
        <NextButton onPress={this.handleNextStep} step={this.state.step} />
        {this.state.step > 2 ? <NamePicker onChangeName={this.onChangeTextName} name={this.state.name} /> : <View></View>}
        {this.state.step > 1 ? <CountryPicker selected={this.state.countrySelected} onChange={this.handleCountrySelect} list={this.state.countryList} /> : <View></View>}
        <CoordinatesPicker mapCenter={this.props.mapCenter} isFreeEntry={this.state.isFreeEntry} toggleFreeEntry={this.toggleFreeEntry} freeEntryLatitude={this.state.freeEntryLatitude} freeEntryLongitude={this.state.freeEntryLongtiude} onChangeTextLatitude={this.onChangeTextLatitude} onChangeTextLongitude={this.onChangeTextLongitude} />
      </View>
    )
  }
}

function NextButton({ onPress, step }) {
  return (
    <View style={{alignItems: 'flex-end', marginTop: 20}}>
      <TouchableOpacity onPress={onPress} style={{backgroundColor: 'red'}}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 18, paddingHorizontal: 20, paddingVertical: 10}}>{step > 2 ? "Save" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  )
}

function CountryPicker({ selected, onChange, list}) {
  return (
    <View style={{borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingTop: 20}}>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 20}}>Country</Text>
        {!selected ? <View></View> : <Text>The dive site appears to be in {selected.label}, is that correct?</Text>}
      </View>
      <View style={{margin: 20}}>
        <Select
          value={selected}
          onChange={onChange}
          options={list}
        />
      </View>
    </View>
  )
}

function CoordinatesPicker({ mapCenter, isFreeEntry, toggleFreeEntry, freeEntryLatitude, freeEntryLongitude, onChangeTextLatitude, onChangeTextLongitude}) {
  return (
    <View>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 20}}>Location</Text>
        <TouchableOpacity onPress={toggleFreeEntry}>
          <Text><span style={{color: isFreeEntry ? 'red' : 'black'}} >Find the spot with the map</span>, or <span style={{color: isFreeEntry ? 'black' : 'red'}} >enter the coordinates manually</span>.</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{flexDirection: 'row', margin: 10}}>
        <View style={{backgroundColor: '#CCCCCC', flex: 1, justifyContent: 'center', height: 50, margin: 10}}>
          {isFreeEntry ? 
          <TextInput
            style={{backgroundColor: '#CCCCCC', flex: 1, fontSize: 20, textAlign: 'center' }}
            onChangeText={text => onChangeTextLatitude(text)}
            value={freeEntryLatitude}
          /> : <Text style={{fontSize: 18, textAlign: 'center'}}>{Number((mapCenter[0]).toFixed(5))}</Text>}
        </View>
        <View style={{backgroundColor: '#CCCCCC', flex: 1, justifyContent: 'center', height: 50, margin: 10}}>
          {isFreeEntry ? 
            <TextInput
              style={{backgroundColor: '#CCCCCC', flex: 1, fontSize: 20, textAlign: 'center' }}
              onChangeText={text => onChangeTextLongitude(text)}
              value={freeEntryLongitude}
            /> : <Text style={{fontSize: 18, textAlign: 'center'}}>{Number((mapCenter[1]).toFixed(5))}</Text>}
        </View>
      </View>
    </View>
  );
}

function NamePicker({ onChangeName, name }) {
  return (
    <View style={{borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Name</Text>
          <TextInput
            style={{backgroundColor: '#CCCCCC', padding: 7, fontSize: 20, margin: 20, marginTop: 5, textAlign: 'center' }}
            onChangeText={text => onChangeName(text)}
            value={name}
            />
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  const destinations = getDestinations(state);
  const user = getUser(state);
  const mapCenter = getMapCenter(state);
  return { destinations, user, mapCenter };
};

export default connect(
  mapStateToProps,
  { setAddDiveSiteMode }
)(DiveSiteAddView);
