import React from 'react';

export default class BoatVisualizer extends React.Component {

    render() {
        return (
            <div className="boat-visualizer">
                <span>{this.props.heading}</span>
            </div>
        )
    }

}