import React from 'react';
import PropTypes from 'prop-types';

export default class StatusSidebarItemWrapper extends React.Component {

  render() {
    return (
      <div className="status-sidebar-item-wrapper">
        <span className="title">{this.props.title}</span>
        {this.props.children}
      </div>
    )
  }

}

StatusSidebarItemWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};