import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { Router, Route, Switch } from 'react-router'
// import ReactGA from 'react-ga';
// import createHistory from 'history/createBrowserHistory';
// import { routerReducer, routerMiddleware } from 'react-router-redux'
// import { toggleSidebarCollapsed } from './data/actions';
// // import registerServiceWorker from './registerServiceWorker';
import styles from './css/styles.css';
import BoatOverview from './boat-overview';
import * as reducers from './data/reducers';
import Sidebar from './sidebar/sidebar';
import SidebarMode from './data/sidebar-modes';
import ServerConnection from './server-connection';
import {
  emit,
  init as websocketInit,
} from "./data/websockets";

// Connect to the server
const serverConnection = new ServerConnection(window.SERVER_URI);
serverConnection.connect();
thunkMiddleware.withExtraArgument({ emit });

// Configure Redux
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
const initialState = {
  general: {
    debug: window.debug,
    isMobile,
    pageTitlePrefix: 'Boat Monitor',
    pageTitleSuffix: 'Olin Aquatic Robotic Systems',
    serverConnection,
  },
  control: {
    heading: {
      ki: 0,
      kp: 0,
    },
  },
};

let store;
if (window.debug && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(
    combineReducers({...reducers}),
    initialState,
    // composeEnhancers(applyMiddleware(
    //   thunkMiddleware, // lets us dispatch() functions
    //   // routeMiddleware,
    // ))
  );
} else {
  store = createStore(
    combineReducers({...reducers}),
    initialState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // routeMiddleware,
    )
  );
}
// Give socket.io access to the data store
websocketInit(store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Sidebar/>
          <BoatOverview/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
// registerServiceWorker();
