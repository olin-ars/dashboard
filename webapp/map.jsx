import React from 'react';
import {Map, Marker, Circle, Polyline, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    const initialCenter = {
      lat: 42.288215,
      lng: -71.309211,
    };

    const waypointMarkers = [];
    const waypointCoords = [];
    const lines = [];
    this.props.waypoints.forEach((wp, index) => {
      const coords = {lat: wp.lat, lng: wp.long};
      waypointMarkers.push((
        <Circle
          title={wp.name || `Waypoint ${index+1}`}
          key={index}
          center={coords}
          radius={this.props.waypointRadius}
          strokeColor="#0000FF"
          fillColor="#0000FF"
          fillOpacity={0.3}
          strokeWeight={3}
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
        zoom={16}
        style={style}
        initialCenter={initialCenter}
      >
        <Marker
          name="Boat!"
          position={this.props.boatCoords} />
        <Marker
          name="Goal!"
          position={this.props.goalCoords} />
        {waypointMarkers}
        {pathLines}
      </Map>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: window.GOOGLE_MAPS_API_KEY,
})(MapContainer);
