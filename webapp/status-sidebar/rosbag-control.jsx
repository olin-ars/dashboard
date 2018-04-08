import React from 'react';

export default class ROSBagControl extends React.Component {

  render() {
    return (
      <div className="rosbag-control">
        <label>Off<input type="radio" value="off" checked={!this.props.rosbagStarted} onChange={this.props.startStopRosbag}/></label>
        <label>On<input type="radio" value="on" checked={this.props.rosbagStarted} onChange={this.props.startStopRosbag}/></label>
      </div>
    )
  }

}