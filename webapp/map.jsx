/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  Circle,
  Polyline,
  GoogleApiWrapper,
} from 'google-maps-react';


export class MapContainer extends React.Component {
  render() {
    const {
      waypoints,
      google,
      boatCoords,
      goalCoords,
      waypointRadius,
    } = this.props;

    const style = {
      width: '100%',
      height: '100%',
    };

    const initialCenter = {
      lat: 42.288215,
      lng: -71.309211,
    };

    const waypointMarkers = [];
    const waypointCoords = [];
    waypoints.forEach((wp, index) => {
      const coords = {
        lat: wp.lat,
        lng: wp.lon,
      };
      const key = `${wp.lat}_${wp.lon}`;
      waypointMarkers.push((
        <Circle
          title={wp.name || `Waypoint ${index + 1}`}
          key={key}
          center={coords}
          radius={waypointRadius}
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
        fillOpacity={0.35}
      />
    ) : null;

    return (
      <Map
        google={google}
        zoom={16}
        style={style}
        initialCenter={initialCenter}
      >
        <Marker
          name="Boat!"
          position={boatCoords}
        />
        <Marker
          name="Goal!"
          position={goalCoords}
        />
        {waypointMarkers}
        {pathLines}
      </Map>
    );
  }
}

MapContainer.propTypes = {
  boatCoords: PropTypes.object.isRequired,
  goalCoords: PropTypes.object.isRequired,
  google: PropTypes.any.isRequired,
  waypoints: PropTypes.array.isRequired,
  waypointRadius: PropTypes.number.isRequired,
};

export default GoogleApiWrapper({
  apiKey: window.GOOGLE_MAPS_API_KEY,
})(MapContainer);
