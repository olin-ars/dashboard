import React from 'react';
import SVGInline from 'react-svg-inline';
import BoatAerialSVG from '../svg/boat-aerial.svg';
import CompassRoseSVG from '../svg/compass-rose.svg';
import StatText from './stat-text';
import numeral from 'numeral';

export default class BoatVisualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          spoofPos: false,
        };

        this.latLongFormat = '0.000000';
        this.headingFormat = '0.0';
    }

    render() {
        // Format lat and long as N/S, E/W
        let latitude = this.props.latitude;
        latitude = `${numeral(Math.abs(latitude)).format(this.latLongFormat)} ${latitude < 0 ? 'S' : 'N'}`;
        let longitude = this.props.longitude;
        longitude = `${numeral(Math.abs(longitude)).format(this.latLongFormat)} ${longitude < 0 ? 'W' : 'E'}`;

        // Format the heading
        let heading = numeral(this.props.heading).format(this.headingFormat);

        const spoofPos = this.state.spoofPos && (
          <div>
            <StatText title="Latitude">
              <input type="text" name="y" value={this.props.latitude} onChange={this.props.spoofedPositionChanged}/>
            </StatText>
            <StatText title="Longitude">
              <input type="text" name="x" value={this.props.longitude} onChange={this.props.spoofedPositionChanged}/>
            </StatText>
          </div>
        );

        return (
          <div>
            <div className="boat-visualizer">
                <div className="visualization">
                    <SVGInline svg={BoatAerialSVG} className="boat"/>
                    <style type="text/css" dangerouslySetInnerHTML={{__html: `
                        .boat svg {
                            transform: rotate(${this.props.heading}deg);
                        }
                    `}}/>
                    <SVGInline svg={CompassRoseSVG} className="compass-rose"/>
                </div>
                <div className="stat-summary">
                    <div className="stat">
                        <span className="title">Position</span>
                        <span>{latitude}</span>
                        <span>{longitude}</span>
                    </div>
                    <div className="stat">
                        <span className="title">Heading</span>
                        <span>{heading}&deg;</span>
                    </div>
                </div>
            </div>
            <label>
              <input type="checkbox" onChange={e => this.setState({spoofPos: e.currentTarget.checked})} />
              Spoof pos
            </label>
            {spoofPos}
          </div>
        )
    }

}