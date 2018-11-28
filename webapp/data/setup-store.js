/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  emit,
  init as websocketInit,
} from './websockets';
import * as reducers from './reducers';

export default function () {
  // Configure Redux
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  const initialState = {
    general: {
      debug: window.debug,
      isMobile,
      pageTitlePrefix: 'Boat Monitor',
      pageTitleSuffix: 'Olin Aquatic Robotic Systems',
      rosbagStarted: false,
    },
    boat: {
      latitude: 0,
      longitude: 0,
      rudderPos: 0,
    },
    control: {
      heading: {
        ki: 0,
        kp: 0,
        error: 0,
        desiredRudderPos: 0,
        targetHeading: 0,
      },
      operatingMode: 0,
    },
    environment: {
      wind: {
        absolute: {
          speed: 0,
          direction: 0,
        },
        relative: {
          speed: 0,
          direction: 0,
        },
      },
    },
    planning: {
      goalPosition: {
        lat: 42.288215,
        lon: -71.309211,
      },
      waypoints: [],
      waypointRadius: 10, // meters
    },
    sidebar: {
      isCollapsed: false,
    },
  };

  const middleware = [
    thunkMiddleware.withExtraArgument({ emit }),
    // routeMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    // Only include the Redux devtools if they're installed and we're debugging
    (window.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? composeEnhancers(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

  // Give socket.io access to the data store
  websocketInit(store);

  return store;
}
