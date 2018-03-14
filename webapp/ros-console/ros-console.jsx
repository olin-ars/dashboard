import React from 'react';
import TopicSelector from './topic-selector';
import MessageTimeline from './message-timeline';
import MessageDetails from './message-details';

export default class ROSConsole extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      detailsMessage: null,
    };
  }

  viewMessageDetails = (msg) => {
    this.setState({ detailsMessage: msg });
  };

  hideMessageDetails = () => {
    this.setState({ detailsMessage: null });
  };

  render() {
    return (
      <div className="console">
        <TopicSelector />
        <MessageTimeline messageClicked={this.viewMessageDetails} />
        <MessageDetails text={this.state.detailsMessage} toggleCollapsed={this.hideMessageDetails} />
      </div>
    )
  }


}