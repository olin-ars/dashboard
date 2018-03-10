import React from 'react';
import StatText from "./stat-text";
import numeral from "numeral";

export default class HeadingController extends React.Component {

  constructor(props) {
    super(props);

    this.decimalFormat = '0.000';
  }

  render() {
    const kpLabel = <span>K<sub>P</sub></span>;
    const kiLabel = <span>K<sub>I</sub></span>;
    return (
      <div className="heading-controller">
        <div className="half-width">
          <StatText title={kpLabel}>
            <input type="text" onChange={this.props.pTermChanged} value={this.props.kp}/>
          </StatText>
          <StatText title={kiLabel}>
            <input type="text" onChange={this.props.iTermChanged} value={this.props.ki}/>
          </StatText>
          <StatText title="Target Heading">
            <input type="text" onChange={this.props.targetHeadingChanged} value={this.props.targetHeading}/>
          </StatText>
        </div>
        <div className="half-width">
          <StatText title="Accumulated Error">
            {numeral(this.props.error).format(this.decimalFormat)}
          </StatText>
          <StatText title="Desired Rudder Position">
            {numeral(this.props.desiredRudderPos).format(this.decimalFormat)}
          </StatText>
        </div>
      </div>
    )
  }

}