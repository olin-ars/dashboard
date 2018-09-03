import React from 'react';
import PropTypes from 'prop-types';

export default class ROSBagControl extends React.Component {
  render() {
    const {
      rosbagStarted,
      startStopRosbag,
    } = this.props;

    return (
      <div className="rosbag-control">
        <label>
          Off
          <input
            type="radio"
            value="off"
            checked={!rosbagStarted}
            onChange={startStopRosbag}
          />
        </label>
        <label>
          On
          <input
            type="radio"
            value="on"
            checked={rosbagStarted}
            onChange={startStopRosbag}
          />
        </label>
      </div>
    );
  }
}

ROSBagControl.propTypes = {
  rosbagStarted: PropTypes.bool.isRequired,
  startStopRosbag: PropTypes.func.isRequired,
};
