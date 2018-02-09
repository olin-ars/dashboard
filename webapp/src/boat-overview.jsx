import React from 'react';
import BoatVisualizer from './boat-visualizer';
import SocketIOClient from 'socket.io-client';

export default class BoatOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            heading: 0,
        }
    }

    componentDidMount = () => {
        // Open WebSocket connection to server
        const wss = SocketIOClient.connect('ws://localhost:1234');
        // let broadcasting = wss.io('/broadcasting');
        wss.on('update', this.receivedHeadingUpdate);
    };

    receivedHeadingUpdate = (msg) => {
        this.setState({heading: msg.heading});
    };

    render() {
        return (
            <div className="page boat-overview">
                <BoatVisualizer heading={this.state.heading}/>
            </div>
        )
    }

}