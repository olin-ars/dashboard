import React from 'react';
import MapContainer from '../containers/map-container';

export default class MonitorPage extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="map-status-container">
          <div className="map">
            <MapContainer />
          </div>
        </div>
        {/* Console goes here */}
      </div>
    );
  }
}
