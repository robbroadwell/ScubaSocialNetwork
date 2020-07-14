import React, { Component } from 'react';
import { View, Text } from 'react-native';
import List from '../../dive-sites/List';
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
  overlays = []
  isPolygonLoaded = false;
  polygonCountry = "";

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
          lat: 12.194579138488749,
          lng: 112.27164246413588
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

      if (this.props.country && !this.isPolygonLoaded) {
        return  // wait until polygon loads to perfom search
      }

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
    if (this.props.country && this.polygonCountry !== this.props.country._id) {
      this.isPolygonLoaded = false
      this.polygonCountry = ""

      while (this.overlays[0]) {
        this.overlays.pop().setMap(null);
      }
    }

    if (this.googleMap && window.google.maps && !this.isPolygonLoaded && this.props.country && this.props.country.geojson) {
      console.log('inside if')

      window.google.maps.Polygon.prototype.getBounds = function() {
        var bounds = new window.google.maps.LatLngBounds();
        var paths = this.getPaths();
        var path;        
        for (var i = 0; i < paths.getLength(); i++) {
            path = paths.getAt(i);
            for (var ii = 0; ii < path.getLength(); ii++) {
                bounds.extend(path.getAt(ii));
            }
        }
        return bounds;
      }

      let allCoordinates = this.props.country.geojson.geometry.coordinates;

      var latMin;
      var latMax;
      var lngMin;
      var lngMax;
      
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
        this.overlays.push(polygon)
        
        let polygonBounds = polygon.getBounds()
        let northeast = polygonBounds.getNorthEast()
        let southwest = polygonBounds.getSouthWest()
        
        latMin = (!latMin || latMin > northeast.lat()) ? northeast.lat() : latMin
        latMin = (!latMin || latMin > southwest.lat()) ? southwest.lat() : latMin
        latMax = (!latMax || latMax < northeast.lat()) ? northeast.lat() : latMax
        latMax = (!latMax || latMax < southwest.lat()) ? southwest.lat() : latMax
        
        lngMin = (!lngMin || lngMin > northeast.lng()) ? northeast.lng() : lngMin
        lngMin = (!lngMin || lngMin > southwest.lng()) ? southwest.lng() : lngMin
        lngMax = (!lngMax || lngMax < northeast.lng()) ? northeast.lng() : lngMax
        lngMax = (!lngMax || lngMax < southwest.lng()) ? southwest.lng() : lngMax        
      }

      var bounds = new window.google.maps.LatLngBounds();
      var coordinates = [
        new window.google.maps.LatLng(latMin, lngMin),
        new window.google.maps.LatLng(latMin, lngMax),
        new window.google.maps.LatLng(latMax, lngMax),
        new window.google.maps.LatLng(latMax, lngMin),
      ]

      for (i = 0; i < coordinates.length; i++) {
        bounds.extend(coordinates[i]);
      }

      this.googleMap.fitBounds(bounds);
      this.isPolygonLoaded = true
      this.polygonCountry = this.props.country._id
    }
  }

  selectDiveSite = (site) => {
    this.props.history.push(`/dive-sites/${site.destination.id}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
  }

  render() {
    this.createMarkers()
    this.createPolygon()

    return (
      <View style={{flexDirection: "row", flex: 1}}>
        {this.props.hideList ? <View></View> :
        <List style={this.props.style} country={this.props.country} history={this.props.history} diveSites={this.state.diveSites} country={this.props.country}/>
        }

        <View style={{flex: 1, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4, shadowRadius: 10, shadowColor: '#000'}}>
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
