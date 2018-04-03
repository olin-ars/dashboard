// This container is a sort of middleware between the React sidebar and the Redux data store

import { connect } from 'react-redux';
import Map from '../map';
// import * as Actions from '../data/actions';
// import { push } from 'react-router-redux';
// import ReactGA from 'react-ga';

// This function passes values/objects from the Redux state to the React component as props
const mapStateToProps = state => {
  return {
    boatCoords: {
      lat: state.boat.latitude,
      lng: state.boat.longitude,
    },
    waypoints: state.planning.waypoints,
    waypointRadius: state.planning.waypointRadius,
  };
};

// This function passes functions from /srcs/data/actions.jsx to the React component as props
const mapDispatchToProps = dispatch => {
  return {

  }
};

// Connect props to Redux state and actions
const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default MapContainer;