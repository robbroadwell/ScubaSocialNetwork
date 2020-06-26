import React, { Component } from 'react';
import { View, Text } from 'react-native';
import List from '../list/List';
import BaseURL from '../../../utility/BaseURL';

import debounce from '../../../utility/debounce';
import { connect } from "react-redux";
import { setMapCenter, setMapRect } from "../../../redux/actions";
import { getAddDiveSiteMode, getMapRect } from "../../../redux/selectors";
import { withRouter } from 'react-router-dom'
import { Polygon } from 'google-maps-react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isPolygonLoaded: false,
        diveSites: [],
    };
  }

  googleMapRef = React.createRef()
  markers = []; // prevent duplicates

  fetchDiveSites = () => {
    var url = BaseURL() + '/api/dive-sites?polygon='+`${this.props.mapRect}`

    if (this.props.country && this.props.country._id) {
      url = url + '&country=' + this.props.country._id
    }

    fetch(url)
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
        console.log(this.googleMap)
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

  createPolygon = () => {
    if (!this.state.isPolygonLoaded && this.googleMap && window.google.maps && this.props.country && this.props.country.geojson) {
      let allCoordinates = this.props.country.geojson.geometry.coordinates;
      
      for(var i=0; i < allCoordinates.length; i++) {
        let coordinates = allCoordinates[i][0]
        let array = []
        coordinates.map(coordinate => array.push({lat: coordinate[1], lng: coordinate[0]}))
      
        let polygon = new window.google.maps.Polygon({
          paths: array,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.1
        })

        polygon.setMap(this.googleMap)
      }

      this.setState({isPolygonLoaded: true})
    }
  }

  selectDiveSite = (site) => {
    this.props.history.push(`/dive-sites/${site.country.replace(/\s+/g, '-').toLowerCase()}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
  }

  render() {
    this.createMarkers()
    this.createPolygon()

    return (
      <View style={{flexDirection: "row", flex: 1}}>
        <List style={this.props.style} country={this.props.country} history={this.props.history} diveSites={this.state.diveSites} country={this.props.country}/>

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
