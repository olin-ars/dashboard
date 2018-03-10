import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { Router, Route, Switch } from 'react-router'
// import ReactGA from 'react-ga';
// import createHistory from 'history/createBrowserHistory';
// import { routerReducer, routerMiddleware } from 'react-router-redux'
import {
  emit,
  init as websocketInit,
} from "./websockets";
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
    },
    boat: {
      latitude: 0,
      longitude: 0,
    },
    control: {
      heading: {
        ki: 0,
        kp: 0,
      },
    },
    environment: {
      wind: {
        speed: 0,
        direction: 0,
      },
    },
  };

  const middleware = [
    thunkMiddleware.withExtraArgument({ emit }),
    // routeMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({...reducers}),
    initialState,
    (window.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? composeEnhancers(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

  // Give socket.io access to the data store
  websocketInit(store);

  return store;

}