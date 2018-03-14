import React from 'react';
import PropTypes from 'prop-types';
import PaneHeader from './pane-header';
import SingleTopicTimeline from './single-topic-timeline';

export default class MessageTimeline extends React.Component {

  render() {
    return (
      <div className="message-timeline">
        <PaneHeader title="ROS Messages" />
        <SingleTopicTimeline {...this.props} />
        <SingleTopicTimeline {...this.props} />
        <SingleTopicTimeline {...this.props} />
      </div>
    )
  }

}

MessageTimeline.propTypes = {
  messageClicked: PropTypes.func.isRequired,
};