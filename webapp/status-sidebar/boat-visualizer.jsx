import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import numeral from 'numeral';
import BoatAerialSVG from '../svg/boat-aerial.svg';
import CompassRoseSVG from '../svg/compass-rose.svg';
import StatText from './stat-text';

export default class BoatVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spoofPos: false,
    };

    this.latLonFormat = '0.000000';
    this.headingFormat = '0.0';
  }

  render() {
    let {
      latitude,
      longitude,
      heading,
    } = this.props;
    const { spoofedPositionChanged } = this.props;
    const { spoofPos } = this.state;

    // Format lat and lon as N/S, E/W
    latitude = `${numeral(Math.abs(latitude)).format(this.latLonFormat)} ${latitude < 0 ? 'S' : 'N'}`;
    longitude = `${numeral(Math.abs(longitude)).format(this.latLonFormat)} ${longitude < 0 ? 'W' : 'E'}`;

    // Format the heading
    heading = numeral(heading).format(this.headingFormat);

    const spoofedPos = spoofPos && (
    <div>
      <StatText title="Latitude">
        <input type="text" name="y" value={latitude} onChange={spoofedPositionChanged} />
      </StatText>
      <StatText title="Longitude">
        <input type="text" name="x" value={longitude} onChange={spoofedPositionChanged} />
      </StatText>
    </div>
    );

    return (
      <div>
        <div className="boat-visualizer">
          <div className="visualization">
            <SVGInline svg={BoatAerialSVG} className="boat" />
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html: `
                        .boat svg {
                            transform: rotate(${heading}deg);
                        }
                    `,
              }}
            />
            <SVGInline svg={CompassRoseSVG} className="compass-rose" />
          </div>
          <div className="stat-summary">
            <div className="stat">
              <span className="title">Position</span>
              <span>{latitude}</span>
              <span>{longitude}</span>
            </div>
            <div className="stat">
              <span className="title">Heading</span>
              <span>
                {heading}
                &deg;
              </span>
            </div>
          </div>
        </div>
        <label>
          <input type="checkbox" onChange={e => this.setState({ spoofPos: e.currentTarget.checked })} />
              Spoof pos
        </label>
        {spoofedPos}
      </div>
    );
  }
}

BoatVisualizer.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  heading: PropTypes.number.isRequired,
  spoofedPositionChanged: PropTypes.func,
};

BoatVisualizer.defaultProps = {
  spoofedPositionChanged: () => {},
};
