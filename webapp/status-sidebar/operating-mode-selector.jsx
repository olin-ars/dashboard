import React from 'react';

export default class OperatingModeSelector extends React.Component {

  render() {
    return (
      <div className="operating-mode">
        <input type="radio" name="op-mode" checked={this.props.control.operatingMode === 0} onClick={this.props.setOperatingMode} value={0} />
        <label>Full manual</label><br/>
        <input type="radio" name="op-mode" checked={this.props.control.operatingMode === 1} onClick={this.props.setOperatingMode} value={1} />
        <label>Autonomous sails, manual rudder</label><br/>
        <input type="radio" name="op-mode" checked={this.props.control.operatingMode === 2} onClick={this.props.setOperatingMode} value={2} />
        <label>Fully autonomous</label><br/>
      </div>
    )
  }

}