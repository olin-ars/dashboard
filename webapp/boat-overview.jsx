import React from 'react';
import BoatVisualizer from './boat-visualizer';
import HeadingControllerContainer from './containers/heading-controller-container';

export default class BoatOverview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      heading: 0,
      latitude: 0,
      longitude: 0,
    }
  }

  componentDidMount = () => {
    // Open WebSocket connection to server
    // const wss = SocketIOClient.connect(`${window.SERVER_URI}/observing`);
    // let broadcasting = wss.io('/broadcasting');
    // wss.on('update', this.receivedUpdate);
  };

  receivedUpdate = (msg) => {
    let newState = Object.assign({}, this.state);
    if (msg.type === 'heading') {
      newState.heading = msg.data;
    } else if (msg.type === 'position') {
      newState.latitude = msg.data.x;
      newState.longitude = msg.data.y;
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="page boat-overview">
        <BoatVisualizer heading={this.state.heading} latitude={this.state.latitude} longitude={this.state.longitude}/>
        <HeadingControllerContainer/>
      </div>
    )
  }

}