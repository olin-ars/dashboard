import React from 'react';
import StatText from './stat-text';
import PropTypes from 'prop-types';

export default class WaypointNavigation extends React.Component {

  render() {
    return (
      <div className="waypoint-nav">
        <StatText title="Waypoint Radius (m)">
          <input type="number" onChange={this.props.setWaypointReachedRadius} value={this.props.planning.waypointRadius}/>
        </StatText>
        <StatText title="Goal Latitude">
          <input type="number" onChange={this.props.setGoalLat} value={this.props.planning.goalPosition.lat}/>
        </StatText>
        <StatText title="Goal Longitude">
          <input type="number" onChange={this.props.setGoalLon} value={this.props.planning.goalPosition.lon}/>
        </StatText>
      </div>
    )
  }

}
