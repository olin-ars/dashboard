import React from 'react';
import PropTypes from 'prop-types';
import StatText from './stat-text';

export default class WindInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spoofWind: false,
      windType: 'windRel',
    };
  }

  windTypeChanged = (e) => {
    this.setState({ windType: e.target.value });
  };

  render() {
    const {
      windRel,
      windAbs,
      spoofedWindChanged,
    } = this.props;
    const {
      spoofWind,
      windType,
    } = this.state;

    const windData = windType === 'windRel' ? windRel : windAbs;

    const windTypeSelector = (
      <div>
        <input type="radio" onChange={this.windTypeChanged} name="windType" value="windAbs" id="trueWind" checked={windType === 'windAbs'} />
        <label htmlFor="trueWind">True</label>
        <input type="radio" onChange={this.windTypeChanged} name="windType" value="windRel" id="relWind" checked={windType === 'windRel'} />
        <label htmlFor="relWind">Relative</label>
      </div>
    );

    const checkbox = (
      <label>
        <input type="checkbox" onChange={e => this.setState({ spoofWind: e.currentTarget.checked })} />
        Spoof wind
      </label>
    );

    return spoofWind ? (
      <div className="wind-info">
        {windTypeSelector}
        {checkbox}
        <StatText title="Direction">
          <input
            type="text"
            name="theta"
            value={windData.direction}
            onChange={spoofedWindChanged}
          />
        </StatText>
        <StatText title="Speed">
          <input
            type="text"
            name="x"
            value={windData.speed}
            onChange={spoofedWindChanged}
          />
        </StatText>
      </div>
    ) : (
      <div className="wind-info">
        {windTypeSelector}
        {checkbox}
        <StatText title="Direction">
          {windData.direction}
          &deg;
        </StatText>
        <StatText title="Speed">
          {windData.speed}
          &nbsp;
          knots
        </StatText>
      </div>
    );
  }
}

WindInfo.propTypes = {
  windRel: PropTypes.shape({
    direction: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  windAbs: PropTypes.shape({
    direction: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  spoofedWindChanged: PropTypes.func,
};

WindInfo.defaultProps = {
  spoofedWindChanged: () => {},
};
