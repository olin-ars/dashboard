import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    const initialCenter = {
      lat: 42.342939,
      lng: -71.030743,
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
        initialCenter={initialCenter}
        centerAroundCurrentLocation
      >
        <Marker
          name="Boat!"
          position={this.props.boatCoords} />
      </Map>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: window.GOOGLE_MAPS_API_KEY,
})(MapContainer);
