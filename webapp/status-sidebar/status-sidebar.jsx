import React from 'react';
import StatusSidebarItemWrapper from './status-sidebar-item-wrapper';
import BoatVisualizer from './boat-visualizer';
import OperatingModeSelector from './operating-mode-selector';
import HeadingController from './heading-controller';
import WindInfo from './wind-info';

export default class StatusSidebar extends React.Component {

  render() {
    return (
      <div className="status sidebar">
        <StatusSidebarItemWrapper title="Operating Mode" >
          <OperatingModeSelector {...this.props} />
        </StatusSidebarItemWrapper>
        <StatusSidebarItemWrapper title="Positioning">
          <BoatVisualizer {...this.props} />
        </StatusSidebarItemWrapper>

        <StatusSidebarItemWrapper title="Heading Control">
          <HeadingController
            kp={this.props.control.heading.kp}
            ki={this.props.control.heading.ki}
            error={this.props.control.heading.error}
            desiredRudderPos={this.props.control.heading.desiredRudderPos}
            targetHeading={this.props.control.heading.targetHeading}
            targetHeadingChanged={this.props.setTargetHeading}
            {...this.props}
          />
        </StatusSidebarItemWrapper>

        <StatusSidebarItemWrapper title="Wind">
          <WindInfo direction={this.props.wind.direction} speed={this.props.wind.speed}/>
        </StatusSidebarItemWrapper>
      </div>
    )
  }

}