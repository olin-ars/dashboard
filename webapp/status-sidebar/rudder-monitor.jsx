import React from 'react';
import PropTypes from 'prop-types';

export default class RudderMonitor extends React.Component {
  render() {
    const { rudderPos } = this.props;

    return (
      <div className="rudder-monitor">
        {rudderPos}
      </div>
    );
  }
}

RudderMonitor.propTypes = {
  rudderPos: PropTypes.number.isRequired,
};
