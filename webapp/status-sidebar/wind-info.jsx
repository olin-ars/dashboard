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
    const checkbox = (
      <label>
        <input type="checkbox" onChange={e => this.setState({spoofWind: e.currentTarget.checked})} />
        Spoof wind
      </label>
    );

    return this.state.spoofWind ? (
      <div className="wind-info">
        {checkbox}
        <StatText title="Direction">
          <input type="text" name="theta" value={this.props.windRel.direction} onChange={this.props.spoofedWindChanged}/>
        </StatText>
        <StatText title="Speed">
          <input type="text" name="x" value={this.props.windRel.speed} onChange={this.props.spoofedWindChanged}/>
        </StatText>
      </div>
    ) : (
      <div className="wind-info">
        {checkbox}
        <StatText title="Direction">{this.props.windRel.direction}&deg;</StatText>
        <StatText title="Speed">{this.props.windRel.speed} knots</StatText>
      </div>
    );
  }

}

WindInfo.propTypes = {
  windRel: PropTypes.object.isRequired,
  spoofedWindChanged: PropTypes.func,
};

WindInfo.defaultProps = {
  spoofedWindChanged: () => {},
};
