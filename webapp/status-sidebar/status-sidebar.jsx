import React from 'react';
import StatusSidebarItemWrapper from './status-sidebar-item-wrapper';
import BoatVisualizer from './boat-visualizer';
import HeadingController from "./heading-controller";
import WindInfo from "./wind-info";

export default class StatusSidebar extends React.Component {

  render() {
    return (
      <div className="status sidebar">
        <StatusSidebarItemWrapper title="Positioning">
          <BoatVisualizer {...this.props} />
        </StatusSidebarItemWrapper>

        <StatusSidebarItemWrapper title="Heading Control">
          <HeadingController {...this.props} />
        </StatusSidebarItemWrapper>

        <StatusSidebarItemWrapper title="Wind">
          <WindInfo direction={this.props.wind.direction} speed={this.props.wind.speed}/>
        </StatusSidebarItemWrapper>
      </div>
    )
  }

}