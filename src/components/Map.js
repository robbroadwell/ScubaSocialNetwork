import React, { Component } from 'react';
import { View } from 'react-native';

import debounce from '../utility/debounce';
import { connect } from "react-redux";
import { setDiveSites, setSelectedDiveSite, setMapCoordinates } from "../redux/actions";
import { getDiveSites, getAddDiveSiteMode } from "../redux/selectors";

class Map extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
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

      var center = new window.google.maps.LatLng(this.googleMap.getCenter().lat(), this.googleMap.getCenter().lng(), false);

      this.props.setMapCoordinates([center.lat(), center.lng()])
      this.searchForDiveSites(coordinates)

    }, 250));
    })
  }

  searchForDiveSites = (coordinates) => {

  fetch('https://www.divingscore.com/api/dive-sites?polygon='+`${coordinates}`)
    .then((response) => response.json())
    .then((json) => {
      this.props.setDiveSites(json);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      // this.setState({ isLoading: false });
    });
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
    if (window.google) {
      const { diveSites, setSelectedDiveSite } = this.props;

      var i, marker;

      for (i = 0; i < diveSites.length; i++) {
        marker = new window.google.maps.Marker({
          position: { lat: diveSites[i].location.coordinates[1], lng: diveSites[i].location.coordinates[0] },
          map: this.googleMap,
        })

        window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            setSelectedDiveSite(diveSites[i])
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
      <View style={{flex: 1}}>
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ flex: 1 }}
        />
        {!this.props.addDiveSiteMode ? <View></View> :
        <View pointerEvents={"none"} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{position: 'absolute', width: '100%', height: 2, backgroundColor: 'white'}} />
          <View style={{position: 'absolute', width: 2, height: '100%', backgroundColor: 'white'}} />
        </View>
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  const diveSites = getDiveSites(state);
  const addDiveSiteMode = getAddDiveSiteMode(state);
  return { diveSites, addDiveSiteMode };
};

export default connect(
  mapStateToProps,
  { setDiveSites, setSelectedDiveSite, setMapCoordinates }
)(Map);