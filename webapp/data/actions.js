// This file contains a bunch of Redux actions

// import { push } from 'react-router-redux';
// import fetch from 'isomorphic-fetch';
// import moment from "moment";
// import ReactGA from 'react-ga';
import {
  WS_EVENT_TYPES,
  ROS_TOPICS,
  ROS_MSG_TYPES,
  emit,
} from "./websockets";

export const ActionTypes = {
  // General UI
  DISPLAY_ERROR: 'DISPLAY_ERROR', // Displays an error message (red background) at the top of the screen TODO: Issue #54
  DISPLAY_MESSAGE: 'DISPLAY_MESSAGE', // Displays a message at the top of the screen TODO: Issue #54
  SET_PAGE_TITLE_PREFIX: 'SET_PAGE_TITLE_PREFIX', // Sets the prefix of the page title (before the app name)
  SET_SIDEBAR_PANE_VISIBILITY: 'SET_SIDEBAR_PANE_VISIBILITY', // Sets which panes (components) are visible in the sidebar
  SET_SIDEBAR_MODE: 'SET_SIDEBAR_MODE', // Sets which panes (components) are visible in the sidebar based on a layout template
  TOGGLE_SIDEBAR_VISIBILITY: 'TOGGLE_SIDEBAR_VISIBILITY', // Toggles the visibility of the app sidebar
  // Control parameters
  SET_OPERATING_MODE: 'SET_OPERATING_MODE',
  SET_HEADING_CONTROLLER_KI: 'SET_HEADING_CONTROLLER_KI',
  SET_HEADING_CONTROLLER_KP: 'SET_HEADING_CONTROLLER_KP',
  SET_HEADING_CONTROLLER_TARGET_HEADING: 'SET_HEADING_CONTROLLER_TARGET_HEADING',
};

// Sections:
//   General UI actions
//   Navigation actions

// ########## Begin General UI Actions ########## //

// ----- Begin notification/message bar actions ----- //

/**
 * Display a message at the top of the window in a notification bar
 */
export function displayMessage(message) {
    return {type: ActionTypes.DISPLAY_MESSAGE, message};
}

/**
 * Display an error message (red background) at the top of the window in a notification bar
 */
export function displayError(error, message) {
    return {type: ActionTypes.DISPLAY_ERROR, error, message};
}

// ----- End notification/message bar actions ----- //

// ----- Begin sidebar actions ----- //

/**
 * Sets the display mode (i.e. which panes are visible).
 * @param {object} mode - one of the modes defined in /src/data/sidebar-modes.js
 */
export function setSidebarMode(mode) {
    return {type: ActionTypes.SET_SIDEBAR_MODE, mode};
}

/**
 * Toggles the visibility of the app sidebar.
 */
export function toggleSidebarCollapsed() {
    return (dispatch, getState) => {
        const action = getState().sidebar.isCollapsed ? 'expand' : 'collapse';
        // ReactGA.event({
        //     category: 'Sidebar',
        //     action,
        //     label: 'User toggled the visibility of the sidebar',
        // });
        dispatch({ type: ActionTypes.TOGGLE_SIDEBAR_VISIBILITY });
    }
}

// ----- End sidebar actions ----- //

// ----- Begin miscellaneous UI actions ----- //

/**
 * Sets the page title prefix (what's displayed before the cross-site app name suffix)
 * @param {string} newTitle - the title
 */
export function setPageTitlePrefix(newTitle) {
    return (dispatch, getState) => {
        let fullTitle;
        const pageTitleSuffix = getState().general.pageTitleSuffix;
        if (!newTitle || newTitle.length === 0) {
            fullTitle = pageTitleSuffix;
        } else if (newTitle.length > 50) {
            fullTitle = `${newTitle.substring(0, 50)}... | ${pageTitleSuffix}`;
        } else {
            fullTitle = `${newTitle} | ${pageTitleSuffix}`;
        }
        dispatch({ type: ActionTypes.SET_PAGE_TITLE_PREFIX, title: fullTitle });
    }
}

// ----- End miscellaneous UI actions ----- //

// ########## End General UI Actions ########## //


// ########## Begin Navigation Actions ########## //

/**
 * Sets the page route (URL suffix).
 * @param {string} route - the URL suffix to use ('/calendar/', '/view/<event_id>', etc)
 */
export function setRoute(route) {
    return dispatch => {
        // dispatch(push(route));
    }
}

// ########## End Navigation Actions ########## //

export function handleROSMessage(msg) {
  return (dispatch, getStore, {emit}) => {

  };
}

// ########## Begin Control Parameter Tweaking ############ //

export function setOperatingMode(mode) {
  return (dispatch, getStore, {emit}) => {
    emit(WS_EVENT_TYPES.PUBLISH_ROS_MESSAGE, buildROSMessage(ROS_TOPICS.CONTROL_OPERATING_MODE, ROS_MSG_TYPES.UInt8, mode));
    // dispatch({ type: ActionTypes.SET_OPERATING_MODE, data: mode }); Change will propagate through ROS back to client
  }
}

export function setHeadingControllerKi(ki) {
  return (dispatch, getStore, {emit}) => {
    emit(WS_EVENT_TYPES.PUBLISH_ROS_MESSAGE, buildROSMessage(ROS_TOPICS.HEADING_CONTROL_KI, ROS_MSG_TYPES.Float32, ki));
    dispatch({ type: ActionTypes.SET_HEADING_CONTROLLER_KI, data: ki });
  }
}

export function setHeadingControllerKp(kp) {
  return (dispatch, getStore, args) => {
    emit(WS_EVENT_TYPES.PUBLISH_ROS_MESSAGE, buildROSMessage(ROS_TOPICS.HEADING_CONTROL_KP, ROS_MSG_TYPES.Float32, kp));
    dispatch({ type: ActionTypes.SET_HEADING_CONTROLLER_KP, data: kp });
  };
}

export function setTargetHeading(theta) {
  return (dispatch, getStore, args) => {
    emit(WS_EVENT_TYPES.PUBLISH_ROS_MESSAGE, buildROSMessage(ROS_TOPICS.HEADING_CONTROL_TARGET_HEADING, ROS_MSG_TYPES.Float32, theta));
    dispatch({ type: ActionTypes.SET_HEADING_CONTROLLER_TARGET_HEADING, data: theta });
  };
}

function buildROSMessage(topicName, type, data, saveToDb=true) {
  return {
    topicName,
    type,
    data,
    saveToDb,
  };
}

// ########## Begin Control Parameter Tweaking ############ //
