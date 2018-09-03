import React from 'react';
import PropTypes from 'prop-types';
import StatText from './stat-text';

export default class WindInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spoofWind: false,
    };
  }

  render() {
    const {
      windAbs,
      spoofedWindChanged,
    } = this.props;
    const { spoofWind } = this.state;

    const checkbox = (
      <label>
        <input type="checkbox" onChange={e => this.setState({ spoofWind: e.currentTarget.checked })} />
        Spoof wind
      </label>
    );

    return spoofWind ? (
      <div className="wind-info">
        {checkbox}
        <StatText title="Direction">
          <input
            type="text"
            name="theta"
            value={windAbs.direction}
            onChange={spoofedWindChanged}
          />
        </StatText>
        <StatText title="Speed">
          <input
            type="text"
            name="x"
            value={windAbs.speed}
            onChange={spoofedWindChanged}
          />
        </StatText>
      </div>
    ) : (
      <div className="wind-info">
        {checkbox}
        <StatText title="Direction">
          {windAbs.direction}
          &deg;
        </StatText>
        <StatText title="Speed">
          {windAbs.speed}
          &nbsp;
          knots
        </StatText>
      </div>
    );
  }
}

WindInfo.propTypes = {
  windAbs: PropTypes.shape({
    direction: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  spoofedWindChanged: PropTypes.func,
};

WindInfo.defaultProps = {
  spoofedWindChanged: () => {},
};
