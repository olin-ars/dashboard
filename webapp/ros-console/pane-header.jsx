import React from 'react';
import PropTypes from 'prop-types';

export default class PaneHeader extends React.Component {

  render() {
    const spacingHack = this.props.toggleCollapsed ? <div/> : null;
    const collapsedToggle = this.props.toggleCollapsed
      ? <div className="collapse-toggle" onClick={this.props.toggleCollapsed}>X</div>
      : null;

    return (
      <div className="pane-header">
        {spacingHack}
        <span className="title">{this.props.title}</span>
        {collapsedToggle}
      </div>
    )
  }

}

PaneHeader.propTypes = {
  title: PropTypes.string.isRequired,
  toggleCollapsed: PropTypes.func,
};
