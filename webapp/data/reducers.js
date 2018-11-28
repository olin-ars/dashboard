/* eslint-disable no-alert,no-console */
// This file contains a bunch of Redux reducers

import { ActionTypes } from './actions';
import { ROS_TOPICS } from './websockets';

export function general(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.DISPLAY_MESSAGE:
      alert(action.message);
      return state;
    case ActionTypes.DISPLAY_ERROR:
      alert((action.message) ? action.message : action.error);
      console.error(action.error);
      // TODO: Report error to some server
      return state;
    case ActionTypes.SET_PAGE_TITLE_PREFIX:
      window.document.title = action.title;
      newState.general = Object.assign({}, newState.general, { pageTitlePrefix: action.title });
      return newState;
    case ActionTypes.SET_ROSBAG_STATUS:
      newState.rosbagStarted = action.data;
      return newState;
    default:
      return state;
  }
}

export function boat(state = {}, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ROS_TOPICS.POSITION:
      newState.longitude = action.data.x;
      newState.latitude = action.data.y;
      return newState;
    case ROS_TOPICS.HEADING:
      newState.heading = action.data;
      return newState;
    case ROS_TOPICS.RUDDER_POSITION:
      newState.rudderPos = action.data;
      return newState;
    default:
      return state;
  }
}

export function control(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.SET_HEADING_CONTROLLER_KI:
      newState.heading.ki = action.data;
      return newState;
    case ActionTypes.SET_HEADING_CONTROLLER_KP:
      newState.heading.kp = action.data;
      return newState;
    case ROS_TOPICS.HEADING_CONTROL_TARGET_HEADING:
    case ActionTypes.SET_HEADING_CONTROLLER_TARGET_HEADING:
      newState.heading.targetHeading = action.data;
      return newState;
    case ActionTypes.SET_OPERATING_MODE:
    case ROS_TOPICS.CONTROL_OPERATING_MODE:
      newState.operatingMode = action.data;
      return newState;
    case ROS_TOPICS.HEADING_CONTROL_ERROR_DESIRED_RUDDER_POS:
      newState.heading.error = action.data.error;
      newState.heading.desiredRudderPos = action.data.desiredRudderPos;
      return newState;
    default:
      return state;
  }
}

export function environment(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ROS_TOPICS.WIND_RELATIVE:
      newState.wind.relative = Object.assign({}, newState.wind.relative, {
        direction: action.data.theta,
        speed: action.data.x,
      });
      return newState;
    case ROS_TOPICS.WIND_TRUE:
      newState.wind.absolute = Object.assign({}, newState.wind.absolute, {
        direction: action.data.theta,
        speed: action.data.x,
      });
      return newState;
    default:
      return state;
  }
}

export function planning(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ROS_TOPICS.GOAL_POSITION:
      newState.goalPosition = {
        lon: action.data.x,
        lat: action.data.y,
      };
      return newState;
    case ActionTypes.SET_GOAL_LAT:
      newState.goalPosition.lat = action.data;
      return newState;
    case ActionTypes.SET_GOAL_LON:
      newState.goalPosition.lon = action.data;
      return newState;
    case ROS_TOPICS.WAYPOINTS:
      newState.waypoints = action.data;
      return newState;
    case ROS_TOPICS.WAYPOINT_RADIUS:
    case ActionTypes.SET_WAYPOINT_REACHED_RADIUS:
      newState.waypointRadius = action.data;
      return newState;
    default:
      return state;
  }
}

export function sidebar(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
