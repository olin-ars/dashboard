import React from 'react';
import PropTypes from 'prop-types';

export default class SingleTopicTimeline extends React.Component {

  render() {
    const messageElems = [];
    this.props.messages.forEach((msg) => {
      messageElems.push(<div className="message" key={msg} onClick={() => this.props.messageClicked(msg)}>{msg}</div>);
    });

    return (
      <div className="single-topic-timeline">
        {messageElems}
      </div>
    )
  }

}

SingleTopicTimeline.propTypes = {
  messageClicked: PropTypes.func.isRequired,
};

SingleTopicTimeline.defaultProps = {
  messages: [
    'Hello',
    'my',
    'name',
    'is',
    'Kyle',
  ],
};