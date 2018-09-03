import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { toggleSidebarCollapsed } from './data/actions';
// import styles from './css/styles.css';
import setupStore from './data/setup-store';
// import BoatOverviewContainer from './containers/status-sidebar-container';
import Sidebar from './nav-sidebar/sidebar';
import MonitorPage from './pages/monitor-page';

const store = setupStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Sidebar />
          <MonitorPage />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
