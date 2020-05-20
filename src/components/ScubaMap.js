import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class ScubaMap extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControlOptions={{
          position: 3,
        }}
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
})(ScubaMap);