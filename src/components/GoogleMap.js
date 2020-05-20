import React, { Component } from 'react'

class GoogleMap extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
    this.googleMap = this.createGoogleMap();
    this.marker = this.createMarker();
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 8,
        center: {
            lat: 25.618760268337972,
            lng: -79.08256345614791
        },
        disableDefaultUI: true,
        mapTypeControlOptions: {
            position: 3,
        },
        mapTypeControl: true,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
    })

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: this.googleMap,
    })

  render() {
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