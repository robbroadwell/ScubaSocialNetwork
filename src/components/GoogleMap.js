import React, { Component } from 'react'

class GoogleMap extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
    this.googleMap = this.createGoogleMap();
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
        // mapTypeControlOptions: {
        //     position: 3,
        // },
        // mapTypeControl: true,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
    })

  createMarkers = () => {
    const { data, select } = this.props;

    var i, marker;

    for (i = 0; i < data.length; i++) {  
      console.log(data[i]);
      marker = new window.google.maps.Marker({
        position: { lat: data[i].latitude, lng: data[i].longitude },
        map: this.googleMap,
      })

      window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          console.log(data[i]);
          select(data[i]);
            // infowindow.setContent(locations[i][0]);
            // infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  render() {
    const { data } = this.props;
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