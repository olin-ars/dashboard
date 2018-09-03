import React from 'react';
import PropTypes from 'prop-types';
import StatusSidebarItemWrapper from './status-sidebar-item-wrapper';
import BoatVisualizer from './boat-visualizer';
import OperatingModeSelector from './operating-mode-selector';
import HeadingController from './heading-controller';
import ROSBagControl from './rosbag-control';
import WaypointNavigation from './waypoint-navigation';
import RudderMonitor from './rudder-monitor';
import WindInfo from './wind-info';

export default class StatusSidebar extends React.Component {
  render() {
    const {
      control,
      setTargetHeading,
    } = this.props;

    return (
      <div className="sidebar-container">
        <div className="status sidebar">
          <StatusSidebarItemWrapper title="Operating Mode">
            <OperatingModeSelector {...this.props} />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Rudder Position">
            <RudderMonitor {...this.props} />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Positioning">
            <BoatVisualizer {...this.props} />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Heading Control">
            <HeadingController
              kp={control.heading.kp}
              ki={control.heading.ki}
              error={control.heading.error}
              desiredRudderPos={control.heading.desiredRudderPos}
              targetHeading={control.heading.targetHeading}
              targetHeadingChanged={setTargetHeading}
              {...this.props}
            />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Wind">
            <WindInfo {...this.props} />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Waypoint Navigation">
            <WaypointNavigation {...this.props} />
          </StatusSidebarItemWrapper>

          <StatusSidebarItemWrapper title="Rosbag">
            <ROSBagControl {...this.props} />
          </StatusSidebarItemWrapper>
        </div>
      </div>
    );
  }
}

// TODO: Is there a cleaner way to do this?
StatusSidebar.propTypes = {
  control: PropTypes.shape({
    heading: PropTypes.shape({
      kp: PropTypes.number.isRequired,
      ki: PropTypes.number.isRequired,
      error: PropTypes.number.isRequired,
      desiredRudderPos: PropTypes.number.isRequired,
      targetHeading: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setTargetHeading: PropTypes.func.isRequired,
};
