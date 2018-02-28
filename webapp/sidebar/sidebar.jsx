// This component is the sidebar, which is displayed across the entire app. Its content merely changes when pages are
// changed.

import React, {Component} from "react";
import {SidebarHeader} from "./sidebar-header.jsx";

export default class Sidebar extends Component {

    render() {
        let mode = this.props.sidebarMode;
        let content = [];

        let sidebarClasses = "app-sidebar" + ((this.props.isCollapsed) ? ' collapsed' : ' expanded');
        return (
            <div className={sidebarClasses}>
                <div className="sidebar">
                    <SidebarHeader homeClicked={this.props.homeClicked} toggleSidebarCollapsed={this.props.toggleSidebarCollapsed} />
                    <div className="sidebar-content">
                        {content}
                    </div>
                </div>
            </div>
        )
    }

}
