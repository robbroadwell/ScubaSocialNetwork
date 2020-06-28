import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import EditButton from '../buttons/EditButton';

class DiveSiteMap extends Component {
  googleMapRef = React.createRef()
  markers = []; // prevent duplicates

  componentDidMount() {
    this.markers = [];

    var googleMapScript;
    
    const children = window.document.body.children;
    if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].title === "map") {
          googleMapScript = children[i]
        }
      }
    }

    if (!googleMapScript) {
      googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E&libraries=places`;
      googleMapScript.title = "map"
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        this.googleMap = this.createGoogleMap();
      })

    } else {
      this.googleMap = this.createGoogleMap();
    }
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 5,
      minZoom: 4,
      center: {
          lat: 25.618760268337972,
          lng: -79.08256345614791
      },
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeId: window.google.maps.MapTypeId.HYBRID,
  })

  createMarkers = () => {
    if (this.props.diveSite && window.google && this.googleMap) {
      const { diveSite } = this.props;

      if (this.markers.includes(diveSite._id)) {
        return
      } else {
        this.markers.push(diveSite._id)
      }

      new window.google.maps.Marker({
        position: { lat: diveSite.location.coordinates[1], lng: diveSite.location.coordinates[0] },
        map: this.googleMap,
      })

      this.googleMap.setCenter({lat: diveSite.location.coordinates[1], lng: diveSite.location.coordinates[0]}); 
      this.googleMap.setOptions({draggable: false})
    }
  }

  render() {
    this.createMarkers()

    return (
      <View style={{flexDirection: "row", flex: 1}}>
        <View style={{flex: 1}}>
          <div
            id="google-map"
            ref={this.googleMapRef}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    )
  }
}

function DiveSiteDetailMap({ style, diveSite }) {
  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Location</Text>
        {/* <EditButton /> */}
      </View>
      <View style={{flexDirection: 'row', margin: 20, marginTop: 5}}>
        {!diveSite ? <View /> : 
          <Text style={{fontSize: 15}}>{diveSite.destination.name}</Text>
        }
        {/* <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
        <Text style={{fontSize: 15}}>Lighthouse Reef</Text> */}
        <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />

        {!diveSite ? <View /> : 
          <Text style={{fontSize: 15}}>{diveSite.location.coordinates[1]}, {diveSite.location.coordinates[0]}</Text>
        }
      </View>
      <View style={{width: '100%', height: 300}}>
        <DiveSiteMap diveSite={diveSite} style={style} />
      </View>
    </View>
  )
}

export default DiveSiteDetailMap;