import React from 'react';
import StatText from "./stat-text";

export default class HeadingController extends React.Component {

  render() {
    const kpLabel = <span>K<sub>P</sub></span>;
    const kiLabel = <span>K<sub>I</sub></span>;
    return (
      <div className="heading-controller">
        <StatText title={kpLabel}>
          <input type="text" onChange={this.props.pTermChanged} value={this.props.kp}/>
        </StatText>
        <StatText title={kiLabel}>
          <input type="text" onChange={this.props.iTermChanged} value={this.props.ki}/>
        </StatText>
      </div>
    )
  }

}