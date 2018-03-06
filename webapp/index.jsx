import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import { toggleSidebarCollapsed } from './data/actions';
// import registerServiceWorker from './registerServiceWorker';
import styles from './css/styles.css';
import setupStore from './data/setup-store';
import BoatOverviewContainer from './containers/boat-overview-container';
import Sidebar from './sidebar/sidebar';
import SidebarMode from './data/sidebar-modes';
const store = setupStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Sidebar/>
          <BoatOverviewContainer/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
// registerServiceWorker();
