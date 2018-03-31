import React from 'react';
import {Map, InfoWindow, Marker, Polyline, GoogleApiWrapper} from 'google-maps-react';


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

    const waypointMarkers = [];
    const waypointCoords = [];
    const lines = [];
    this.props.waypoints.forEach((wp, index) => {
      const coords = {lat: wp.lat, lng: wp.long};
      waypointMarkers.push((
        <Marker
          title={wp.name || `Waypoint ${index+1}`}
          key={index}
          position={coords}
        />
      ));
      waypointCoords.push(coords);
    });
    const pathLines = waypointCoords.length > 1 ? (
      <Polyline
        path={waypointCoords}
        strokeColor="#FF0000"
        strokeOpacity={0.6}
        strokeWeight={2}
        fillColor="#FF0000"
        fillOpacity={0.35} />
    ) : null;

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
        {waypointMarkers}
        {pathLines}
      </Map>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: window.GOOGLE_MAPS_API_KEY,
})(MapContainer);
