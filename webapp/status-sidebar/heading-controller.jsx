import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import StatText from './stat-text';

export default class HeadingController extends React.Component {
  constructor(props) {
    super(props);

    this.decimalFormat = '0.000';
  }

  render() {
    const {
      error,
      desiredRudderPos,
      kp,
      ki,
      pTermChanged,
      iTermChanged,
      targetHeading,
      targetHeadingChanged,
      setWindFilterWindowSize,
    } = this.props;

    const kpLabel = (
      <span>
        K
        <sub>P</sub>
      </span>
    );
    const kiLabel = (
      <span>
        K
        <sub>I</sub>
      </span>
    );
    return (
      <div className="heading-controller">
        <div className="half-width">
          <StatText title={kpLabel}>
            <input type="text" onChange={pTermChanged} value={kp} />
          </StatText>
          <StatText title={kiLabel}>
            <input type="text" onChange={iTermChanged} value={ki} />
          </StatText>
          <StatText title="Target Heading">
            <input type="text" onChange={targetHeadingChanged} value={targetHeading} />
          </StatText>
        </div>
        <div className="half-width">
          <StatText title="Accumulated Error">
            {numeral(error).format(this.decimalFormat)}
          </StatText>
          <StatText title="Desired Rudder Position">
            {numeral(desiredRudderPos).format(this.decimalFormat)}
          </StatText>
          <StatText title="Wind Filter Window Size">
            <input type="text" onChange={setWindFilterWindowSize} />
          </StatText>
        </div>
      </div>
    );
  }
}

HeadingController.propTypes = {
  error: PropTypes.number.isRequired,
  desiredRudderPos: PropTypes.number.isRequired,
  kp: PropTypes.number.isRequired,
  ki: PropTypes.number.isRequired,
  pTermChanged: PropTypes.func.isRequired,
  iTermChanged: PropTypes.func.isRequired,
  targetHeading: PropTypes.number.isRequired,
  targetHeadingChanged: PropTypes.func.isRequired,
  setWindFilterWindowSize: PropTypes.func.isRequired,
};
