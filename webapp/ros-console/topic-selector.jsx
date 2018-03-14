import React from 'react';
import PropTypes from 'prop-types';
import PaneHeader from './pane-header';

export default class TopicSelector extends React.Component {

  render() {
    const topicElems = [];
    this.props.topics.forEach((topic) => {
      topicElems.push(<span key={topic} className="topic">{topic}</span>);
    });

    return (
      <div className="topic-selector sidebar">
        <PaneHeader title="ROS Topics"/>
        {topicElems}
      </div>
    )
  }

}

TopicSelector.propTypes = {
  topics: PropTypes.array,
};

TopicSelector.defaultProps = {
  topics: [
    '/boat/heading',
    '/boat/position',
    '/control/heading/ki',
    '/control/heading/kp',
    '/control/heading/error_desired_rudder_pos',
    '/control/heading/target',
  ],
};