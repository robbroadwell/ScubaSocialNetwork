import React, { Component } from 'react';
import { View } from 'react-native';

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

export default DiveSiteMap;