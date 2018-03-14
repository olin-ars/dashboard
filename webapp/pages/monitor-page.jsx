import React from 'react';
import MapContainer from '../containers/map-container';
import StatusSidebarContainer from '../containers/status-sidebar-container';
import ROSConsole from '../ros-console/ros-console';

export default class MonitorPage extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="map-status-container">
          <div className="map">
            <MapContainer />
          </div>
          <StatusSidebarContainer />
        </div>
        <ROSConsole/>
      </div>
    )
  }

}