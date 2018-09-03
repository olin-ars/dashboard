import React from 'react';
import PropTypes from 'prop-types';
import StatText from './stat-text';

export default class WaypointNavigation extends React.Component {
  render() {
    const {
      setGoalLat,
      setGoalLon,
      setWaypointReachedRadius,
      planning,
    } = this.props;

    return (
      <div className="waypoint-nav">
        <StatText title="Waypoint Radius (m)">
          <input
            type="number"
            onChange={setWaypointReachedRadius}
            value={planning.waypointRadius}
          />
        </StatText>
        <StatText title="Goal Latitude">
          <input
            type="number"
            onChange={setGoalLat}
            value={planning.goalPosition.lat}
          />
        </StatText>
        <StatText title="Goal Longitude">
          <input
            type="number"
            onChange={setGoalLon}
            value={planning.goalPosition.lon}
          />
        </StatText>
      </div>
    );
  }
}

WaypointNavigation.propTypes = {
  setGoalLat: PropTypes.number.isRequired,
  setGoalLon: PropTypes.number.isRequired,
  setWaypointReachedRadius: PropTypes.func.isRequired,
  planning: PropTypes.shape({
    goalPosition: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
