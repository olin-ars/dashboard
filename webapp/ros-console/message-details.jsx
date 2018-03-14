import React from 'react';
import PropTypes from 'prop-types';
import PaneHeader from './pane-header';

export default class MessageDetails extends React.Component {

  render() {
    const className = this.props.text ? 'sidebar message-details visible' : 'sidebar message-details';
    return (
      <div className={className}>
        <PaneHeader title="Details" toggleCollapsed={this.props.toggleCollapsed} />
        {this.props.text}
      </div>
    )
  }

}

MessageDetails.propTypes = {
  text: PropTypes.string,
  toggleCollapsed: PropTypes.func,
};

MessageDetails.defaultProps = {
  toggleCollapsed: null,
  text: null,
};