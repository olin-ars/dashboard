import React from 'react';
import PropTypes from 'prop-types';

export default class RudderMonitor extends React.Component {

  render() {
    return (
      <div className="rudder-monitor">
        {this.props.rudderPos}
      </div>
    )
  }

}

RudderMonitor.propTypes = {
  rudderPos: PropTypes.number.isRequired,
};