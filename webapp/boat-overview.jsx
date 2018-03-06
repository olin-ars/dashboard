import React from 'react';
import BoatVisualizer from './boat-visualizer';
import HeadingControllerContainer from './containers/heading-controller-container';

export default class BoatOverview extends React.Component {

  render() {
    return (
      <div className="page boat-overview">
        <BoatVisualizer
          heading={this.props.heading}
          latitude={this.props.latitude}
          longitude={this.props.longitude}
        />
        <HeadingControllerContainer/>
      </div>
    )
  }

}