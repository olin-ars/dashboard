// This component is the sidebar, which is displayed across the entire app. Its content merely
// changes when pages are changed.

import React, { Component } from 'react';
import SidebarHeader from './sidebar-header';

export default class Sidebar extends Component {
  render() {
    // const mode = this.props.sidebarMode;
    const content = [];
    const { isCollapsed } = this.props;

    const sidebarClasses = `app-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`;
    return (
      <div className={sidebarClasses}>
        <div className="sidebar">
          <SidebarHeader {...this.props} />
          <div className="sidebar-content">
            {content}
          </div>
        </div>
      </div>
    );
  }
}
