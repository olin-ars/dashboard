import React from 'react';

export default class HeadingController extends React.Component {

  render() {
    return (
      <div className="heading-controller">
        <span>Proportional term</span>
        <input type="text" onChange={this.props.pTermChanged} value={this.props.kp}/>
        <span>Integral term</span>
        <input type="text" onChange={this.props.iTermChanged} value={this.props.ki}/>
      </div>
    )
  }

}