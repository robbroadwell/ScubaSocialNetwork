import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        initialCenter={{
         lat: 25.618760268337972,
         lng: -81.08256345614791
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDK1d0EuOMSupb27KqzQJCkTqjSDjXtf-E'
})(MapContainer);