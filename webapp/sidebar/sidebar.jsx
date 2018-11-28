// This component is the sidebar, which is displayed across the entire app. Its content merely
// changes when pages are changed.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarHeader from './sidebar-header';
import StatusSidebarItemWrapper from './status-sidebar-item-wrapper';
import BoatVisualizer from './boat-visualizer';
import OperatingModeSelector from './operating-mode-selector';
import HeadingController from './heading-controller';
import ROSBagControl from './rosbag-control';
import WaypointNavigation from './waypoint-navigation';
import RudderMonitor from './rudder-monitor';
import WindInfo from './wind-info';

export default class Sidebar extends Component {
  render() {
    const {
      control,
      isCollapsed,
      setTargetHeading,
    } = this.props;

    const sidebarClasses = `app-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`;
    return (
      <div className={sidebarClasses}>
        <div className="sidebar">
          <div className="sidebar-container">
            <SidebarHeader {...this.props} />
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
      </div>
    );
  }
}

// TODO: Is there a cleaner way to do this?
Sidebar.propTypes = {
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
