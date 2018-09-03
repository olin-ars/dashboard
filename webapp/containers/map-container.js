// This container is a sort of middleware between the React sidebar and the Redux data store

import { connect } from 'react-redux';
import Map from '../map';
// import * as Actions from '../data/actions';
// import { push } from 'react-router-redux';
// import ReactGA from 'react-ga';

// This function passes values/objects from the Redux state to the React component as props
const mapStateToProps = state => ({
  boatCoords: {
    lat: state.boat.latitude,
    lng: state.boat.longitude,
  },
  goalCoords: {
    lat: state.planning.goalPosition.lat,
    lng: state.planning.goalPosition.lon,
  },
  waypoints: state.planning.waypoints,
  waypointRadius: state.planning.waypointRadius,
});

// This function passes functions from /srcs/data/actions.jsx to the React component as props
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({

});

// Connect props to Redux state and actions
const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default MapContainer;
