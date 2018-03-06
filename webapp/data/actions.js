// This file contains a bunch of Redux actions

// import { push } from 'react-router-redux';
// import fetch from 'isomorphic-fetch';
// import moment from "moment";
// import ReactGA from 'react-ga';
import {
  MESSAGE_TYPES as WS_MESSAGE_TYPES,
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
  SET_HEADING_CONTROLLER_KI: 'SET_HEADING_CONTROLLER_KI',
  SET_HEADING_CONTROLLER_KP: 'SET_HEADING_CONTROLLER_KP',
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

// ########## Begin Control Parameter Tweaking ############ //

export function setHeadingControllerKi(ki) {
  return (dispatch, getStore, {emit}) => {
    emit(WS_MESSAGE_TYPES.SET_HEADING_CONTROL_KI, ki);
    dispatch({ type: ActionTypes.SET_HEADING_CONTROLLER_KI, data: ki });
  }
}

export function setHeadingControllerKp(kp) {
  // TODO Send message to server
  return (dispatch, getStore, args) => {
    emit(WS_MESSAGE_TYPES.SET_HEADING_CONTROL_KP, kp);
    dispatch({ type: ActionTypes.SET_HEADING_CONTROLLER_KP, data: kp });
  };
}

// ########## Begin Control Parameter Tweaking ############ //
