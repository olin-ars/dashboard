import React from 'react';
import StatusSidebarContainer from '../containers/status-sidebar-container';

export default class MonitorPage extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="map-status-container">
          {/*Map goes here*/}
          <StatusSidebarContainer/>
        </div>
        {/*Console goes here*/}
      </div>
    )
  }

}