import React, { Component } from 'react';
import { View, Text } from 'react-native';
import List from '../list/List';
import BaseURL from '../../../utility/BaseURL';

import debounce from '../../../utility/debounce';
import { connect } from "react-redux";
import { setMapCenter, setMapRect } from "../../../redux/actions";
import { getAddDiveSiteMode, getMapRect } from "../../../redux/selectors";
import { withRouter } from 'react-router-dom'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        diveSites: [],
    };
  }

  googleMapRef = React.createRef()
  markers = []; // prevent duplicates

  fetchDiveSites = () => {
    fetch(BaseURL() + '/api/dive-sites?polygon='+`${this.props.mapRect}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ diveSites: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }
  

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
        this.addBoundsListener();
      })

    } else {
      this.googleMap = this.createGoogleMap();
      this.addBoundsListener();
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

  addBoundsListener = () => {
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

      this.props.setMapCenter([center.lat(), center.lng()])
      this.props.setMapRect(coordinates)
      this.fetchDiveSites()

    }, 250));
  }

  createMarkers = () => {
    if (window.google) {
      const { diveSites } = this.state;

      var i, marker;
      for (i = 0; i < diveSites.length; i++) {

        if (this.markers.includes(diveSites[i]._id)) {
          continue
        } else {
          this.markers.push(diveSites[i]._id)
        }

        marker = new window.google.maps.Marker({
          position: { lat: diveSites[i].location.coordinates[1], lng: diveSites[i].location.coordinates[0] },
          map: this.googleMap,
          // icon: require('../assets/dot.png')
        })

        window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return () => {this.selectDiveSite(diveSites[i]) }
        }.bind(this))(marker, i));
      }
    }
  }

  selectDiveSite = (site) => {
    this.props.history.push(`/dive-sites/${site.country.replace(/\s+/g, '-').toLowerCase()}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
  }

  render() {
    this.createMarkers()

    return (
      <View style={{flexDirection: "row", flex: 1}}>
        <List style={this.props.style} history={this.props.history} diveSites={this.state.diveSites} />

        <View style={{flex: 1}}>
          <div
            id="google-map"
            ref={this.googleMapRef}
            style={{ flex: 1 }}
          />
          {!this.props.addDiveSite ? <View></View> :
          <View pointerEvents={"none"} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', width: '100%', height: 2, backgroundColor: 'white'}} />
            <View style={{position: 'absolute', width: 2, height: '100%', backgroundColor: 'white'}} />
          </View>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const addDiveSiteMode = getAddDiveSiteMode(state);
  const mapRect = getMapRect(state);
  return { addDiveSiteMode, mapRect };
};

export default connect(
  mapStateToProps,
  { setMapCenter, setMapRect }
)(withRouter(Map));
