// This container is a sort of middleware between the React sidebar and the Redux data store

import { connect } from 'react-redux';
import Sidebar from '../sidebar/sidebar';
import {
  setOperatingMode,
  setHeadingControllerKi,
  setHeadingControllerKp,
  setGoalLat,
  setGoalLon,
  setTargetHeading,
  startStopRosbag,
  setWaypointReachedRadius,
  setSpoofedWind,
  setSpoofedPosition,
  setWindFilterWindowSize,
} from '../data/actions';

// This function passes values/objects from the Redux state to the React component as props
const mapStateToProps = state => ({
  general: state.general,
  isCollapsed: state.sidebar.isCollapsed,
  latitude: state.boat.latitude,
  longitude: state.boat.longitude,
  heading: state.boat.heading,
  control: state.control,
  windAbs: state.environment.wind.absolute,
  windRel: state.environment.wind.relative,
  rudderPos: state.boat.rudderPos,
  rosbagStarted: state.general.rosbagStarted,
  planning: state.planning,
});

// This function passes functions from /srcs/data/actions.jsx to the React component as props
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({
  iTermChanged: (e) => {
    dispatch(setHeadingControllerKi(e.target.value));
  },
  pTermChanged: (e) => {
    dispatch(setHeadingControllerKp(e.target.value));
  },
  setTargetHeading: (e) => {
    dispatch(setTargetHeading(e.target.value));
  },
  setOperatingMode: (e) => {
    dispatch(setOperatingMode(parseInt(e.target.value, 10)));
  },
  startStopRosbag: (e) => {
    const doStart = e.target.value === 'on';
    dispatch(startStopRosbag(doStart));
  },
  setWaypointReachedRadius: (e) => {
    const radius = parseInt(e.target.value, 10);
    if (!Number.isNaN(radius)) {
      dispatch(setWaypointReachedRadius(radius));
    }
  },
  setGoalLat: (e) => {
    dispatch(setGoalLat(e.target.value));
  },
  setGoalLon: (e) => {
    dispatch(setGoalLon(e.target.value));
  },
  spoofedWindChanged: (e) => {
    dispatch(setSpoofedWind(e.currentTarget.name, e.currentTarget.value));
  },
  spoofedPositionChanged: (e) => {
    dispatch(setSpoofedPosition(e.currentTarget.name, e.currentTarget.value));
  },
  setWindFilterWindowSize: (e) => {
    dispatch(setWindFilterWindowSize(e.target.value));
  },
});

// Connect props to Redux state and actions
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;
