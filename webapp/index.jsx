import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { toggleSidebarCollapsed } from './data/actions';
// Import the CSS for bundling (this actually does do something)
// eslint-disable-next-line no-unused-vars
import styles from './css/styles.css';
import setupStore from './data/setup-store';
import Sidebar from './containers/sidebar-container';
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
