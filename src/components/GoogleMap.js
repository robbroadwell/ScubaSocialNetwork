import React, { Component } from 'react';
import debounce from '../utility/debounce';

class GoogleMap extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const { mapMoved } = this.props;

    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
    this.googleMap = this.createGoogleMap();
    
    window.google.maps.event.addListener(this.googleMap, 'bounds_changed', debounce(() => { 
      var bounds = this.googleMap.getBounds();

      var NECorner = bounds.getNorthEast()
      var SWCorner = bounds.getSouthWest()

      var coordinates = [
          [SWCorner.lng(), NECorner.lat()],
          [NECorner.lng(), NECorner.lat()],
          [NECorner.lng(), SWCorner.lat()],
          [SWCorner.lng(), SWCorner.lat()],
          [SWCorner.lng(), NECorner.lat()]
        ]

      mapMoved(coordinates)

    }, 250));
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 5,
        center: {
            lat: 25.618760268337972,
            lng: -79.08256345614791
        },
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
    })

  createMarkers = () => {
    if (window.google) {
      const { data, select } = this.props;

      var i, marker;

      for (i = 0; i < data.length; i++) {  
        marker = new window.google.maps.Marker({
          position: { lat: data[i].location.coordinates[1], lng: data[i].location.coordinates[0] },
          map: this.googleMap,
        })

        window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            select(data[i]);
              // infowindow.setContent(locations[i][0]);
              // infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }
  }

  render() {
    
    this.createMarkers()
  
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ flex: 1 }}
      />
    )
  }
}

export default GoogleMap;