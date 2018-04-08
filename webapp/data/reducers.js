// This file contains a bunch of Redux reducers

import { ActionTypes } from './actions';
import { ROS_TOPICS } from "./websockets";
import SidebarModes from '../data/sidebar-modes';

export function general(state = {}, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.DISPLAY_MESSAGE:
            alert(action.message);
            return state;
        case ActionTypes.DISPLAY_ERROR:
            alert((action.message) ? action.message : action.error);
            console.error(action.error);
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
  let newState = Object.assign({}, state);
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
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.SET_HEADING_CONTROLLER_KI:
      newState.heading.ki = action.data;
      return newState;
    case ActionTypes.SET_HEADING_CONTROLLER_KP:
      newState.heading.kp = action.data;
      return newState;
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
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ROS_TOPICS.WIND_RELATIVE:
      newState.wind.relative.direction = action.data.theta;
      newState.wind.relative.speed = action.data.x;
      return newState;
    default:
      return state;
  }
}

export function planning(state = {}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ROS_TOPICS.WAYPOINTS:
      newState.waypoints = action.data;
      return newState;
    default:
      return state;
  }
}
