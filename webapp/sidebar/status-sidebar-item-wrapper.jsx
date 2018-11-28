import React from 'react';
import PropTypes from 'prop-types';

export default class StatusSidebarItemWrapper extends React.Component {
  render() {
    const {
      title,
      children,
    } = this.props;

    return (
      <div className="status-sidebar-item-wrapper">
        <span className="title">{title}</span>
        {children}
      </div>
    );
  }
}

StatusSidebarItemWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
